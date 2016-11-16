
const quickReplies = {}
quickReplies.createCategoryReplies = (categories) => {
    let elements = categories.map((category) => {
        let element = {
            "content_type":"text",
            "payload":`show_deals_by_category-${category._id.category}`,
            "title":`${category._id.label} (${category.count})`
        };
        return element;
    });
    return elements;
};

export default quickReplies;
