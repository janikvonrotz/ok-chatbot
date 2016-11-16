import queries from './queries';
import attachments from './attachments';
import quickReplies from './quick_replies';

const { createDealCards, createButtons } = attachments;
const { createCategoryReplies } = quickReplies;
const { getCountedCategories, getUser, getDealsById, saveProfile } = queries;

export { createDealCards, createCategoryReplies, createButtons,
 getCountedCategories, getUser, getDealsById, saveProfile }
