//UTILITIES


//randomly reorders an array and returns the reordered array;
function reorder(arr){
  var newArr = [];
  for(d = 0; d < arr.length; d++)newArr.splice(Math.floor(Math.random()*(newArr.length+1)), 0, arr[d]);
  return newArr;
}

function containsArr(arr, item){
    var result = false;
    final_loop:
    for(d = 0; d < arr.length; d++){
        if(arr[d].length == item.length){
            result = true
            for(c = 0; c < item.length; c++){
                if(arr[d][c]!=item[c])result = false;
            }
            if(result)break final_loop;
        }
    }
    return result;
}