import { ADWEB_OWNER } from '../constants/productTypes';
import type { ChangeRequest, RecentChangeItem, RecentRejectedItem } from '../types';

export function formatTimestamp(date: Date): string {
  const day = date.toLocaleDateString('no-NO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const time = date.toLocaleTimeString('no-NO', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${day} kl. ${time}`;
}

function createBaseFromRequest(request: ChangeRequest, processedAt: Date) {
  const isVideoWithPlanner =
    request.productType === 'video-ad' && request.planner;

  return {
    advertiser: request.advertiser,
    orderNumber: request.orderNumber,
    campaign: request.campaign,
    productType: request.productType,
    planner: isVideoWithPlanner ? request.planner : undefined,
    responsible: isVideoWithPlanner ? request.planner! : ADWEB_OWNER.responsible,
    initials: isVideoWithPlanner ? request.plannerInitials! : ADWEB_OWNER.initials,
    avatarColor: isVideoWithPlanner ? '#badaf8' : ADWEB_OWNER.avatarColor,
    timestamp: formatTimestamp(processedAt),
    changes: request.changes.map((change) => ({ ...change })),
  };
}

export function createRecentChangeFromRequest(
  request: ChangeRequest,
  processedAt = new Date(),
): RecentChangeItem {
  return {
    kind: 'change',
    id: `processed-${request.id}-${processedAt.getTime()}`,
    ...createBaseFromRequest(request, processedAt),
  };
}

export function createRecentRejectedFromRequest(
  request: ChangeRequest,
  rejectionMessage: string,
  processedAt = new Date(),
): RecentRejectedItem {
  return {
    kind: 'rejected',
    id: `rejected-${request.id}-${processedAt.getTime()}`,
    rejectionMessage,
    ...createBaseFromRequest(request, processedAt),
  };
}
