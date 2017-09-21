function Set() {
	
	
	this.intersection = function(listA, listB) {
    
	   var resultList = [];
       
	   /*-------------------------------Insert your code here -------------------------------------*/
	    if(listA === null || listB === null){
	    	return null;
		}

		for(var i = 0;i < listA.length;i++){
	    	for(var j = 0;j < listB.length;j++){
	    		if(listB[j] === listA[i]){
	    			resultList.push(listB[j]);
	    			break;
				}
			}
		}


	   /*-------------------------------Insert your code here -------------------------------------*/
       
	   return resultList;
	}
    
    
    
	this.union = function(listA, listB) {

	   var resultList = [];
       
	   /*-------------------------------Insert your code here -------------------------------------*/
        if(listA === null || listB === null){
            return null;
        }

        resultList = listA.concat(listB);
        resultList = resultList.slice().sort();
        for(var i = 0;i < resultList.length - 1;i++){
        	if(resultList[i] === resultList[i + 1]){
        		//remove only the first matching item from our comparison.
        		resultList.splice(i, 1);
			}
		}
	   /*-------------------------------Insert your code here -------------------------------------*/ 
	   
	   return resultList;
	}


	this.relativeComplement = function(listA, listB) {

	   var resultList = [];
       
	   /*-------------------------------Insert your code here -------------------------------------*/
        if(listA === null || listB === null){
            return null;
        }

        var tempArr = listA.slice();
        var symd = tempArr.filter(function(x){
            if(listB.indexOf(x) === -1){
                resultList.push(x);
            }
        })
	   /*-------------------------------Insert your code here -------------------------------------*/
       
	   return resultList;
	}



	this.symmetricDifference = function(listA, listB) {

	   var resultList = [];
       
	   /*-------------------------------Insert your code here -------------------------------------*/
        if(listA === null || listB === null){
            return null;
        }
        var tempArr = listA.concat(listB);
        var symd = tempArr.filter(function(x){
        	if(listA.indexOf(x) === -1 || listB.indexOf(x) === -1){
        		resultList.push(x);
			}
		})
	   /*-------------------------------Insert your code here -------------------------------------*/
	   return resultList;
	}	
	

}
