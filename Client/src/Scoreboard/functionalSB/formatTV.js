export const formatTV = function(selectedGameData, rawGameData) {
    try{
        selectedGameData.tv = rawGameData.broadcast[0].names[0];
    }
    catch {
        selectedGameData.tv = '';
    }
}