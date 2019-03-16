
export const changeSelectedTab = (selectedTab) => {
    return {
        type: 'CHANGE_SELECTED_TAB',
        activeTab: selectedTab,
    };
}
