import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { PlannerFilter } from './components/PlannerFilter';
import { TaskCard } from './components/TaskCard';
import { RecentChanges } from './components/RecentChanges';
import { RejectModal } from './components/RejectModal';
import { ClarificationModal } from './components/ClarificationModal';
import { EmptyState } from './components/EmptyState';
import { INITIAL_REQUESTS, RECENT_ITEMS } from './data/mockData';
import { createRecentChangeFromRequest, createRecentRejectedFromRequest, formatTimestamp } from './utils/recentItems';
import styles from './App.module.css';

export default function App() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [expandedId, setExpandedId] = useState<string | null>('1');
  const [recentItems, setRecentItems] = useState(RECENT_ITEMS);
  const [recentExpandedId, setRecentExpandedId] = useState<string | null>(null);
  const [plannerFilter, setPlannerFilter] = useState('Kim Skjold');
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [clarifyingCampaignId, setClarifyingCampaignId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (plannerFilter === 'Alle planleggere') return requests;
    return requests.filter((r) => r.planner === plannerFilter);
  }, [requests, plannerFilter]);

  function completeApprovedRequest(id: string) {
    const request = requests.find((r) => r.id === id);
    if (!request) return;

    setRequests((prev) => prev.filter((r) => r.id !== id));
    setRecentItems((prev) => [
      createRecentChangeFromRequest(request),
      ...prev,
    ]);
    if (expandedId === id) setExpandedId(null);
  }

  function completeRejectedRequest(id: string, rejectionMessage: string) {
    const request = requests.find((r) => r.id === id);
    if (!request) return;

    setRequests((prev) => prev.filter((r) => r.id !== id));
    setRecentItems((prev) => [
      createRecentRejectedFromRequest(request, rejectionMessage),
      ...prev,
    ]);
    if (expandedId === id) setExpandedId(null);
    setRejectingId(null);
  }

  function handleApprove(id: string) {
    completeApprovedRequest(id);
  }

  function handleRejectCancel() {
    setRejectingId(null);
  }

  function handleRejectSend(message: string) {
    if (rejectingId) completeRejectedRequest(rejectingId, message);
  }

  function handleAcknowledgeRecentItem(id: string) {
    setRecentItems((prev) => prev.filter((item) => item.id !== id));
    if (recentExpandedId === id) setRecentExpandedId(null);
  }

  function handleClarificationCancel() {
    setClarifyingCampaignId(null);
  }

  function handleClarificationSend(message: string) {
    if (!clarifyingCampaignId) return;

    const now = new Date();
    setRecentItems((prev) =>
      prev.map((item) =>
        item.id === clarifyingCampaignId && item.kind === 'campaign'
          ? {
              ...item,
              status: 'needs-clarification' as const,
              clarificationComment: message,
              clarificationTimestamp: formatTimestamp(now),
            }
          : item,
      ),
    );
    setClarifyingCampaignId(null);
  }

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.body}>
        <Sidebar />
        <main className={styles.main}>
          <PlannerFilter value={plannerFilter} onChange={setPlannerFilter} />

          <section className={styles.tasksSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionHeading}>Mine oppgaver</h2>
              <span className={styles.count}>
                {filtered.length}{' '}
                {filtered.length === 1 ? 'oppgave gjenstår' : 'oppgaver gjenstår'}
              </span>
            </div>
            {filtered.length === 0 ? (
              <EmptyState />
            ) : (
              <div className={styles.taskList}>
                {filtered.map((request) => (
                  <TaskCard
                    key={request.id}
                    request={request}
                    expanded={expandedId === request.id}
                    onToggle={() =>
                      setExpandedId((id) => (id === request.id ? null : request.id))
                    }
                    onApprove={() => handleApprove(request.id)}
                    onReject={() => setRejectingId(request.id)}
                  />
                ))}
              </div>
            )}
          </section>

          <RecentChanges
            items={recentItems}
            count={recentItems.length}
            expandedId={recentExpandedId}
            onToggle={(id) =>
              setRecentExpandedId((current) => (current === id ? null : id))
            }
            onAcknowledge={handleAcknowledgeRecentItem}
            onRequestClarification={setClarifyingCampaignId}
          />
        </main>
      </div>

      {rejectingId && (
        <RejectModal
          onCancel={handleRejectCancel}
          onSend={handleRejectSend}
        />
      )}

      {clarifyingCampaignId && (
        <ClarificationModal
          onCancel={handleClarificationCancel}
          onSend={handleClarificationSend}
        />
      )}
    </div>
  );
}
