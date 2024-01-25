waitForKeyElements('[queryparamshandling="merge"]', actionFunction, false);
function actionFunction (jNode){
  var value = document.querySelectorAll('[queryparamshandling="merge"]')[0].innerHTML;
  var regex = /(-)+/gi;
  console.log(value.replace(regex, ''));
  console.log(value);
  var regPhoneNum = value.replace(regex, '')
  var newPhoneNum = `<a href='https://pro.housecallpro.com/pro/customers/list?search_term=${regPhoneNum}&page_size=50&page=1'>${regPhoneNum}</a>`
  document.querySelectorAll('[queryparamshandling="merge"]')[0].innerHTML = newPhoneNum;
  //window.open('https://vaskotech.com', 'HousecallWindow');
};