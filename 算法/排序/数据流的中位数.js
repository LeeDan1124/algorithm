/**
如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。
如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。我们使用Insert()方法读取数据流，
使用GetMedian()方法获取当前读取数据的中位数。

进阶： 空间复杂度 O(n)  ， 时间复杂度 O(nlogn) 
示例1
输入：
[5,2,3,4,1,6,7,0,8]
返回值：
"5.00 3.50 3.00 3.50 3.00 3.50 4.00 3.50 4.00 "
说明：
数据流里面不断吐出的是5,2,3...,则得到的平均数分别为5,(5+2)/2,3...   
 */

function Insert(num)
{
    // write code here
    arr.push(num)
}
function GetMedian(){
	// write code here
    
}
module.exports = {
    Insert : Insert,
    GetMedian : GetMedian
};