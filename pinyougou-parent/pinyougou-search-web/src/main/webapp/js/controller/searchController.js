app.controller('searchController',function($scope,$location,searchService){
	
	//搜索
	$scope.search=function(){
        $scope.searchMap.pageNo= parseInt($scope.searchMap.pageNo) ;
		searchService.search($scope.searchMap).success(
			function(response){
				$scope.resultMap=response;
                buildPageLabel();//调用
			}
		);		
	}
  //搜索对象
	$scope.searchMap={'keywords':'','category':'','brand':'','spec':{},'price':'','pageNo':1,'pageSize':40 ,'sortField':'','sort':'' };

      $scope.addSearchItem=function (key,value) {
		  if(key=='category'||key=='brand' ||key=='price'){
		  	$scope.searchMap[key]=value;
		  }else {
		  	$scope.searchMap.spec[key]=value;
		  }
          $scope.search();//执行搜索
      };

    $scope.removeSearchItem=function(key){
        if(key=="category" || key=="brand" ||key=='price'){
            $scope.searchMap[key]="";
        }else{//否则是规格
            delete $scope.searchMap.spec[key];//移除此属性
        }
        $scope.search();//执行搜索
    }

    buildPageLabel=function() {
        $scope.pageLabel = [];//新增分页栏属性
        var maxPageNo = $scope.resultMap.totalPages;//得到最后页码
        var firstPage = 1;//开始页码
        var lastPage = maxPageNo;//截止页码
        $scope.firstDot=true;//前面有点
        $scope.lastDot=true;//后边有点

        if ($scope.resultMap.totalPages > 5) { //如果总页数大于 5 页,显示部分页码
            if ($scope.searchMap.pageNo <= 3) {//如果当前页小于等于 3
                lastPage = 5; //前 5 页
                $scope.firstDot = false;//前面没点
            } else if ($scope.searchMap.pageNo >= lastPage - 2) {//如果当前页大于等于最大
                页码 - 2
                firstPage = maxPageNo - 4; //后 5 页
                $scope.lastDot = false;//后边没点
            } else { //显示当前页为中心的 5 页
                firstPage = $scope.searchMap.pageNo - 2;
                lastPage = $scope.searchMap.pageNo + 2;
            }
        }else{
                $scope.firstDot=false;//前面无点
                $scope.lastDot=false;//后边无点
            }

        for (var i = firstPage; i <= lastPage; i++) {
            $scope.pageLabel.push(i);
        }
    }

//根据页码查询
    $scope.queryByPage=function(pageNo) {
//页码验证
        if (pageNo < 1 || pageNo > $scope.resultMap.totalPages) {
            return;
        }
        $scope.searchMap.pageNo = pageNo;
        $scope.search();

    }

    $scope.isTopPage=function() {
        if ($scope.searchMap.pageNo == 1) {
            return true;
        } else {
            return false;
        }
    }

    $scope.isEndPage=function(){
        if($scope.searchMap.pageNo==$scope.resultMap.totalPages){
            return true;
        }else{
            return false;
        }
    }

    $scope.sortSearch=function(sortField,sort){
        $scope.searchMap.sortField=sortField;
        $scope.searchMap.sort=sort;
        $scope.search();
    }

//判断关键字是不是品牌
    $scope.keywordsIsBrand=function(){
        for(var i=0;i<$scope.resultMap.brandList.length;i++){
            if($scope.searchMap.keywords.indexOf($scope.resultMap.brandList[i].text)>=0){//
                如果包含
                return true;
            }
        }
        return false;
    }

    $scope.loadkeywords=function() {
        $scope.searchMap.keywords = $location.search()['keywords'];
        $scope.search();
    }


    })