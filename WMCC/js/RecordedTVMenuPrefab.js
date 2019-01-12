var RecordedTVMenuPrefab = function () {
    return new GameObject("Recorded TV Menu", [
        new RecordedTVSortMenu(),
        new RecordedTVItemMenu(),
        new RecordedTVItemInfo()]);
};