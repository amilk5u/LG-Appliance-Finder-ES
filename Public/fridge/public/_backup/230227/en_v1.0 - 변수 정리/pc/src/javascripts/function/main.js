function main() {
   // class Subject {
   //    constructor() {
   //       this.observers = [];
   //    }

   //    getObserverList() {
   //       return this.observers;
   //    }

   //    subscribe(observer) {
   //       this.observers.push(observer);
   //    }

   //    unsubscribe(observer) {
   //       this.observers = this.observers.filter(
   //          (obs) => obs !== observer
   //       );
   //    }
   //    notifyAll() {
   //       this.observers.forEach((subscriber) => {
   //          try {
   //             subscriber.update(this.constructor.name);
   //          } catch (error) {
   //             console.log(error);
   //          }
   //       });
   //       console.log('complete : ', this.observers);
   //    }
   // }

   // class Observer {
   //    constructor(name) {
   //       this.name = name;
   //    }
   //    update(subj) {
   //       console.log(`${this.name}`);
   //    }

   // } //주제 객체 만들기
   // const subj = new Subject();
   // // 옵저버 만들기
   // const obj1 = new Observer("1번 구독자");
   // const obj2 = new Observer("2번 구독자");
   // const obj3 = new Observer("3번 구독자");
   // // 구독하기
   // subj.subscribe(obj1);
   // $(".resister").on("click", function () {
   //    subj.subscribe(obj2);
   //    console.log("추가");
   // });
   // // 구독자 정보 확인하기
   // console.log(subj.getObserverList());
   // // 알림보내기
   // subj.notifyAll(); // 구독해지
   // $(".delete").on("click", function () {
   //    subj.unsubscribe(obj2);
   //    console.log("삭제");
   // });
   // console.log('-------------------');
   // // 다시 보기
   // $(".complete").on("click", function () {
   //    subj.notifyAll();
   // });


   /* 랜딩페이지 URL */
   let resultPageUrl;
   let stageLiveDecide;
   let currentUrl = document.location.href;
   currentUrl.includes('lg.com') ? stageLiveDecide = true : stageLiveDecide = false;
   if (stageLiveDecide) {
      resultPageUrl = './risultati-della-ricerca';
   } else {
      resultPageUrl = 'https://wwwstg.lg.com/it/frigoriferi/risultati-della-ricerca';
   }

   /* intro */
   let imgPath;
   let introJsonPath;
   let desktopWidthOrHigher = window.innerWidth >= 1024;
   if (desktopWidthOrHigher) {
      introJsonPath = './images/pc/intro/intro_animation.json';
      imgPath = './images/pc/';
      imgPreload(); 
   } else {
      introJsonPath = './images/intro/intro_animation.json';
      imgPath = './images/';
   }

   const introLottie = lottie.loadAnimation({
      container: document.getElementById('animationPlayer'),
      path: introJsonPath,
      renderer: 'svg',
      loop: false
   });


   let introDeleteAndRefresh = currentUrl.includes('intro=no');
   if (introDeleteAndRefresh) {
      $introAnimation.css('display', 'none');
      $quickFinder.css('display', 'block');
   } else {
      introLottie.addEventListener('complete', function () {
         TweenMax.to($introAnimation, .3, { opacity: 0, display: "none" });
         $(window).scrollTop(headerHeight);
      });
   }

   /* 다음 스텝 */
   function moveNextStep() {
      let _pressedNext = true;
      let _lastFinderIndex = Object.values(configData).length - 1;

      idx === _lastFinderIndex && resultChoice()
      if (idx < $(this).hasClass('active')) {
         idx++;
         stepMovement(_pressedNext);
      }
   }

   /* 이전 스텝 */
   function moveBackStep() {
      let _pressedNext = false;
      if (idx > 0) {
         idx--;
         stepMovement(_pressedNext);
      }
   }

   let _currentStructural = Object.values(configData)[idx]; // 현재 스텝 마크업
   let _currentStep = Object.keys(configData)[idx];
   /* 스텝 이동 */
   function stepMovement(_pressedNext) {
      for (let i in Object.keys(configData)) {
         console.log(Object.keys(configData)[i]);
         console.log(Object.values(configData)[i]);
      }

      let _lastAnswerValue; // 저장된 데이터에서 마지막 value 
      let _stepProductArray = []; // 스텝별 제품 추출

      // idx === 0 ? $backBtn.css('display', 'none') : $backBtn.css('display', 'block') // step 1에서 back 버튼 삭제

      MarkUpAndRefresh();
      productMatchingAndActivation();

      /* 옵션 클릭 이벤트 */
      $('.option_btn').on('click', answerSelect);
   }


   /* 초기화 & 구조 생성 */
   function MarkUpAndRefresh() {
      let _questionText = _currentStructural.questionText;
      let _defaultScreenImg = _currentStructural.defaultScreenImg;

      $('body,html').scrollTop(0);
      $descDetailWrap.removeClass('open');
      $showNow.removeClass('active');
      $finderMain.removeClass().addClass(_currentStep);
      $(window).scrollTop(headerHeight);
      $nextBtn.attr('data-link-name', "'" + nextContent + ' : Q' + (idx + 1) + ' ' + $('#finderNav li').eq(idx).find('p').text());
      $qnaWrap.prepend('<strong class="que_title">' + _questionText + '</strong>');
      $descHeadWrap.prepend('<strong>' + _questionText + '</strong>');
      $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + _defaultScreenImg + ')');
      // $selectWrap.html('<button type="button" class="caution_open_btn">Clicca qui per vedere i consigli su misure e dimensioni.</button><p class="select_tit"><em>' + multipleSelectionContent + ' </em></p>');

      let _currentoption = _currentStructural.option;
      for (let i = 0; i < _currentoption.length; i++) { 
         $selectWrap.find('ol').append(`<li><button class="option_btn" type="button" data-value="${_currentoption[i].value}"><span></span><p>${_currentoption[i].content}</p></button></li>`);
         if (_currentoption[i].value === ANYTHING) {
            $selectWrap.find('ol li').eq(i).find('.option_btn').addClass('anything');
         }
      }
   }


   /* 제품 매칭 & 옵션 활성화 */
   function productMatchingAndActivation() {
      let _stepProductArray = [];
      let matchingProducts = [];

      console.log(matchingProducts.length < 1);

      // if (matchingProducts.length < 1) {
      //    let selectedValue = selectedParameters[selectedParameters.length - 1].split('=')[1]; // value
      //    for (let value in productSpec) {
      //       if (product[key][_selectKey] === _selectValue) {
      //          _stepProductArray.push(product[key]);
      //       } 
      //    }
      //    matchingProducts.push(_stepProductArray);
      // }
   }

   /* 클릭 시 발생 함수 */
   function answerSelect() {
      let _this = $(this);
      let _currentOptionValue = _this.data('value');
      // console.log(_currentOptionValue)

      $loadMoreBtn.removeClass('active').removeAttr('data-link-name');
      $learnMoreBtn.removeAttr('data-popup').removeAttr('id').removeClass('active').removeAttr('data-link-name');
      $('.popup_movie_step05 .popup_wrap > div').css('display', 'none');

      if (idx === 0) {
         $('.option_btn').removeClass('active');
         selectedParameters = [];
         selectedParameters.push(_currentOptionValue); // push
      }
      if (!_this.hasClass('active')) {
         _this.addClass('active');
      }
      if (stepCount[idx] !== undefined) {
         stepCount[idx] = $('.answer_btn.active').length;
      } else {
         stepCount.push($('.answer_btn.active').length);
      }
      // console.log('stepCount : ', stepCount);
      // console.log('selectedParameters (배열에 저장된 키/벨류 값) : ', selectedParameters);
      showOptionData();
   }


   /* 데이터 뿌리기 */
   function showOptionData() {
      if ($('.option_btn.active').length > 0) {
         $finderMain.addClass('ready');
         $subContain.addClass('active');

         // 데이터 없는 부분
         // if (idx !== 2 && _selectData[0].DataNon === true) {
         //    $('.que_title').css('display', 'block');
         //    $descHeadWrap.css('display', 'none');
         // }

         // if (idx === 1) {
         //    $descIcon.attr('style', 'background-image:url(' + imgPath + _selectData[0].changeData.icon + ')');
         //    $descHead.text(_selectData[0].changeData.description);
         // } else if (idx === 2) {
         //    let _currentHtml = configData.htmlData[2]; // 현재 스텝의 항목 데이터
         //    $descIcon.attr('style', 'background-image:url(' + imgPath + _currentHtml[0].changeData.icon + ')');
         //    $descHead.text(_currentHtml[0].changeData.description.head);
         //    $descDetail.text(_currentHtml[0].changeData.description.detail);
         // } else if (idx === 5) {
         //    $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + 'step06/' + selectedProduct[0].class + '_' + _selectData[0].changeData.screenImg + ')');
         //    $descHead.text(_selectData[0].changeData.description);
         // } else {
         //    $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + _selectData[0].changeData.screenImg + ')');
         //    if (_selectData[0].changeData.description.head !== undefined) {
         //       // 디스크립션 디테일
         //       $descHead.text(_selectData[0].changeData.description.head);
         //       $descDetail.text(_selectData[0].changeData.description.detail);
         //       $loadMoreBtn.addClass('active');
         //       $loadMoreBtn.attr('id', 'descMoreBtn');
         //       _moreCont = _selectData[0].content.replace(/(<([^>]+)>)/ig, '');
         //       $loadMoreBtn.attr('data-link-name', 'Load More : ' + _moreCont);
         //    } else {
         //       $descHead.text(_selectData[0].changeData.description);
         //       $loadMoreBtn.removeClass('active');
         //       $loadMoreBtn.removeAttr('id');
         //    }
         // }


      } else {
         $finderMain.removeClass('ready');
         $description.css('display', 'none');
         $descDetailWrap.removeClass('open');
         $subContain.removeClass('active');
      }
   }




   /* Event */
   $nextBtn.on('click', moveNextStep);
   $backBtn.on('click', moveBackStep);

   /* Appliance Finder Start */
   stepMovement(idx);
}