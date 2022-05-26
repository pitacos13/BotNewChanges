function getHours(dateOne, dateTwo){
    console.log(dateTwo.getTime())
    var diff = (dateOne.getTime() - dateTwo.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
}