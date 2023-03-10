function main() {
   let _currentStructural;
   let _currentStep;
   let _questionText;
   let _defaultScreenImg;

   class Subject {
      constructor() {
         this.selectedParameters = []; // Filter Push 
         this.stepCount = []; // Acitve Count
      }

      /* 초기 세팅 */
      defaultSeting() {
         let resultPageUrl;
         let stageLiveDecide;
         let currentUrl = document.location.href;
         currentUrl.includes('lg.com') ? stageLiveDecide = true : stageLiveDecide = false;
         if (stageLiveDecide) {
            resultPageUrl = './risultati-della-ricerca';
         } else {
            resultPageUrl = 'https://wwwstg.lg.com/it/frigoriferi/risultati-della-ricerca';
         }
         let desktopWidthOrHigher = window.innerWidth >= 1024;
         let introJsonPath;
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
               // $(window).scrollTop(headerHeight);
            });
         }
      }

      /* 마크업 초기화 & 생성 */
      setMarkupdate() {
         _currentStructural = Object.values(configData)[idx]; // 현재 스텝 마크업 구조
         _currentStep = Object.keys(configData)[idx];
         _questionText = _currentStructural.questionText;
         _defaultScreenImg = _currentStructural.defaultScreenImg;

         $finderMain.removeClass().addClass(_currentStep);
         $(window).scrollTop(headerHeight);
         $queTitle.empty().text(_questionText);
         $descHeadWrap.find('strong').text(_questionText);
         $selectContainer.empty();
         $nextBtn.attr('data-link-name', nextContent + ' : Q' + (idx + 1) + ' ' + $('#finderNav li').eq(idx).find('p').text());
         // $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + _defaultScreenImg + ')');

         let _currentoption = _currentStructural.option;
         if (_currentStructural.subStep === undefined) {
            _currentoption.forEach(function (option) {
               $selectContainer.append(`<li><button class="option_btn" type="button" data-value="${option.value}"><i></i><p>${option.content}</p></button></li>`);
               if (option.value === NOTDATA) {
                  $selectContainer.find('li').last().find('button').prop('disabled', true);
               }
            });
         } else {
            let _subStep = Object.values(_currentStructural.subStep);
            _subStep.forEach(function (subStepItem, subStepIndex) {
               let optionHtml = '';
               if (subStepItem.allSelectOption) {
                  optionHtml += `<button class="all_select" type="button" data-key="${SELECTALL}" data-value=""><span></span><p>${selectAllContent}</p></button>`;
               }
               subStepItem.option.forEach(function (subOption) {
                  optionHtml += `<button class="option_btn" type="button" data-key="${subOption.value}" data-value=""><p>${subOption.content}</p></button>`;
               });
               $selectContainer.append(`<li><span>${Object.keys(_currentStructural.subStep)[subStepIndex]}<div><em>${multipleSelectionContent}</em></div> </span><div>${optionHtml}</div></li>`);
            })
         }

         if (_currentStructural.anythingOption) {
            $selectContainer.append(`<li><button class="option_btn" type="button" data-value="${ANYTHING}"><i></i><p>${anythingContent}</p></button></li>`)
         }
         if (_currentStructural.allSelectOption) {
            $selectContainer.prepend(`<li><button class="all_select" type="button" data-value="${SELECTALL}"><span></span><p>${selectAllContent}</p></button></li>`)
         }
         if (idx === 5) {
            $nextBtn.text(nextLastContent);
         }
      }

      /* 선택 옵션 active & 해제 */
      optionActivation(_item) {
         let _value = _item.data('value');
         let _active;
         let _optionArray;

         if (_currentStructural.singleOption) {
            $('.option_btn').removeClass('active');
         }
         if (!_item.hasClass('active')) {
            _item.addClass('active');
            _active = true;
            if (_value === ANYTHING) {
               _optionArray = applianceFinder.stateOptions(_value, _active);
               _optionArray.forEach(function (element) {
                  element.removeClass('active');
               });
            } else {
               _optionArray = applianceFinder.stateOptions(_value, _active);
               _optionArray.forEach(function (element) {
                  element.removeClass('active');
               });
            }
         } else {
            _item.removeClass('active');
            _active = false;
            applianceFinder.stateOptions(_value, _active);
         }

         applianceFinder.filterUpdate(_value, _active, _optionArray);
      }

      /* 전체 선택 옵션 active & 해제 */
      allSelectoptionActivation(_item) {
         let _active;
         let _optionArray;

         if (!_item.hasClass('active')) {
            _active = true;
            _item.addClass('active');
            _optionArray = applianceFinder.stateOptions(SELECTALL, _active);
            _optionArray.forEach(function (element) {
               element.addClass('active');
            });
         } else {
            _active = false;
            _item.removeClass('active');
            _optionArray = applianceFinder.stateOptions(SELECTALL, _active);
            _optionArray.forEach(function (element) {
               element.removeClass('active');
            });
         }
         applianceFinder.filterUpdate(SELECTALL, _active, _optionArray);
      }

      /* 옵션 선택후 옵션의 상태 판단 */
      stateOptions(_value, _active) {
         let _optionArray = [];
         let enabledOptions = 0; // 활성화된 옵션 갯수
         let activeOption = 0; // acitve 된 옵션 갯수

         $('.option_btn').each(function () {
            let _this = $(this);
            if (_active) {
               if (_value === SELECTALL) {
                  if (!_this.hasClass('active') && _this.data('value') !== ANYTHING && _this.attr('disabled') === undefined) {
                     _optionArray.push(_this);
                     activeOption++;
                  }
               } else if (_value === ANYTHING) {
                  if (_this.hasClass('active') && _this.data('value') !== ANYTHING) {
                     _optionArray.push(_this);
                  }
               } else {
                  if (_this.data('value') === ANYTHING) {
                     _optionArray.push(_this);
                  }
               }
            } else {
               if (_value === SELECTALL) {
                  if (_this.attr('disabled') === undefined && _this.data('value') !== ANYTHING) {
                     activeOption--;
                     _optionArray.push(_this);
                  }
               }
            }

            // active 된 옵션 갯수 카운팅
            if (_this.hasClass('active')) {
               activeOption++;
            }
            // 활성화된 옵션 갯수 카운팅
            if (_this.data('value') !== ANYTHING && _this.attr('disabled') === undefined) {
               enabledOptions++;
            }
         });



         /* All Select 예외 처리 */
         console.log(activeOption === enabledOptions, activeOption, enabledOptions)
         if (activeOption === enabledOptions) {
            $('.all_select').addClass('active');
            this.selectedParameters.push(SELECTALL);
         } else {
            $('.all_select').removeClass('active');
            this.selectedParameters = this.selectedParameters.filter(function (element) {
               return element !== SELECTALL
            });
         }
         return _optionArray;
      }

      /* 필터 업데이트 추가 & 삭제 */
      filterUpdate(_value, _active, _optionArray) {
         if (idx === 0) {
            this.selectedParameters = [];
         }
         if (_active) {
            // 선택 값 추가
            if (_value === SELECTALL) {
               for (let i = 0; i < _optionArray.length; i++) {
                  this.selectedParameters.push(_optionArray[i].data('value'));
               }
            }
            if (_value === ANYTHING) {
               for (let i = 0; i < _optionArray.length; i++) { // 버튼 active 카운팅 만큼 반복문 실행
                  this.selectedParameters.splice(-1, 1);
               }
            } else {
               this.selectedParameters = this.selectedParameters.filter(function (element) {
                  return element !== ANYTHING
               });
            }
            // this.selectedParameters.push(_value);
         } else {
            // 선택 해제 값 삭제
            this.selectedParameters = this.selectedParameters.filter(function (element) {
               return element !== _value
            });
            if (_value === SELECTALL) {
               for (let i = 0; i < _optionArray.length; i++) { // 버튼 active 카운팅 만큼 반복문 실행
                  this.selectedParameters.splice(-1, 1);
               }
            }
         }
         console.log(this.selectedParameters);
      }



      /* 카운팅 */
      countingUpdate() {

      }

      /* 선택한 필터 제품 매칭 저장 */
      MatchingProducts() {

      }
      /* 선택한 필터 제품 삭제 */
      MatchingProductsDelete() {

      }

      /* 매칭된 제품 버튼 활성화 & 비활성화 */
      optionDisabled() {

      }

      // getObserverList() {
      //    return this.observers;
      // }
      // subscribe(observer) {
      //    this.observers.push(observer);
      // }
      // unsubscribe(observer) {
      //    console.log(this.observers)
      //    this.observers = this.observers.filter((obs) => function () {
      //       obs !== observer
      //    });
      // }
      // notifyAll() {
      //    this.observers.forEach((subscriber) => {
      //       try {
      //          subscriber.update(this.constructor.name);
      //       } catch (error) {
      //          console.log(error);
      //       }
      //    });
      //    console.log('complete : ', this.observers);
      // }
   }

   // class Observer {
   //    constructor(name) {
   //       this.name = name;
   //    }
   //    update(subj) {
   //       console.log(`${this.name}`);
   //    }
   // }

   //주제 객체 만들기
   const applianceFinder = new Subject();
   // 옵저버 만들기
   // const Observer1 = new Observer("1번 구독자");
   // const Observer2 = new Observer("2번 구독자");
   // const Observer3 = new Observer("3번 구독자");


   // 구독하기
   // $(".resister").on("click", function () {
   //    // applianceFinder.subscribe(Observer2);
   //    // applianceFinder.notifyAll();
   //    // applianceFinder.getObserverList();
   // });
   // 구독자 정보 확인하기

   // 알림보내기
   // subj.notifyAll(); // 구독해지
   // $(".delete").on("click", function () {
   //    applianceFinder.unsubscribe(Observer2);
   //    applianceFinder.notifyAll();
   //    applianceFinder.getObserverList();
   // });

   applianceFinder.defaultSeting();
   applianceFinder.setMarkupdate();

   /* 다음 스텝 클릭 이벤트 */
   $nextBtn.on('click', function () {
      let _lastFinderIndex = Object.values(configData).length - 1;
      if (idx < _lastFinderIndex) {
         idx++;
      }
      applianceFinder.setMarkupdate();
   });

   /* 이전 스텝 클릭 이벤트 */
   $backBtn.on('click', function () {
      if (idx > 0) {
         idx--;
      }
      applianceFinder.setMarkupdate();
   });

   /* 옵션 클릭 이벤트 */
   $(document).on('click', '.option_btn', function () {
      let _item = $(this);
      applianceFinder.optionActivation(_item);
   });

   /* all Select 클릭 이벤트 */
   $(document).on('click', '.all_select', function () {
      let _item = $(this);
      applianceFinder.allSelectoptionActivation(_item);
   });

}