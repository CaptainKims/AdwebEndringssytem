export type ProductType = 'video-ad' | 'display-sponsorship' | 'pause-ad';

export type ProductFilterValue = 'all' | ProductType;

export interface ChangeItem {
  id: string;
  text: string;
  linkText?: string;
  textAfter?: string;
  linkText2?: string;
  textAfter2?: string;
}

export interface ChangeRequest {
  id: string;
  advertiser: string;
  orderNumber: string;
  campaign: string;
  productType: ProductType;
  planner?: string;
  plannerInitials?: string;
  requesterName: string;
  requesterContactHref: string;
  changes: ChangeItem[];
}

export interface CampaignOrderLine {
  id: string;
  name: string;
  requisitionNumber: string;
  lineReference: string;
  period: string;
  product: string;
  cpt: string;
  estimatedViews: string;
  budgetNet: string;
}

export interface CampaignSummary {
  campaignId: string;
  advertiserName: string;
  campaignName: string;
  period: string;
  budgetNet: string;
  requisitionNumber: string;
  attachments: string;
  comment: string;
  orderLines: CampaignOrderLine[];
  totalPeriod: string;
  totalViews: string;
  totalBudget: string;
}

interface RecentItemBase {
  id: string;
  advertiser: string;
  orderNumber: string;
  campaign: string;
  productType: ProductType;
  planner?: string;
  responsible: string;
  initials: string;
  avatarColor: string;
  timestamp: string;
}

export interface RecentChangeItem extends RecentItemBase {
  kind: 'change';
  changes: ChangeItem[];
}

export interface RecentRejectedItem extends RecentItemBase {
  kind: 'rejected';
  changes: ChangeItem[];
  rejectionMessage: string;
}

export type CampaignStatus = 'new' | 'needs-clarification';

export interface RecentCampaignItem extends RecentItemBase {
  kind: 'campaign';
  status: CampaignStatus;
  summary: CampaignSummary;
  clarificationComment?: string;
  clarificationTimestamp?: string;
}

export type RecentItem = RecentChangeItem | RecentRejectedItem | RecentCampaignItem;
