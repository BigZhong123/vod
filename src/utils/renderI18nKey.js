export const renderI18nKey = function(key) {
    const text = this.$t(key);
    if(text === key) {
        const arr = text.split('.');
        return arr[arr.length-1]
    }
    return text
}