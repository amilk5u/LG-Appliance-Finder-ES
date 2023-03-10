function main() {
   let _currentStructural;
   let _currentStep;
   let _questionText;
   let _defaultScreenImg;
   let _lastFinderIndex = Object.values(configData).length - 1;

   class Subject {
      constructor() {
         this.selectedParameters = []; // Filter Push 
         this.stepCount = []; // Acitve Count
         this.selectedProduct; // 셀렉된 제품 데이터 
         this.duplicationDel = [];
         // this.selectAllArray = []; // SELECTALL 배열
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
            // imgPreload();
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
      setMarkupDate() {
         // console.log('index : ', idx, '--------------------------------------------------------------------');
         _currentStructural = Object.values(configData)[idx]; // 현재 스텝 마크업 구조
         _currentStep = Object.keys(configData)[idx];
         _questionText = _currentStructural.questionText;
         _defaultScreenImg = _currentStructural.defaultScreenImg;

         $queTitle.css('display', 'block');
         $finderMain.removeClass().addClass(_currentStep);
         $(window).scrollTop(headerHeight);
         $queTitle.empty().text(_questionText);
         $descHeadWrap.find('strong').text(_questionText);
         $selectContainer.empty();
         $nextBtn.attr('data-link-name', nextContent + ' : Q' + (idx + 1) + ' ' + $('#finderNav li').eq(idx).find('p').text());
         $description.css('display', 'none');

         /* Main Images Open */
         if (_defaultScreenImg) {
            $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + _defaultScreenImg + ')');
         } else {
            $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + this.selectedProduct.changeScreenImg + ')');
            if (idx === _lastFinderIndex) {
               $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + this.selectedProduct.lastScreenImg + ')');
            }
         }

         /* Mark Up */
         let _currentOption = _currentStructural.option;
         if (_currentStructural.subStep === undefined) {
            _currentOption.forEach(function (option) {
               $selectContainer.append(`<li><button class="option_btn" type="button" data-value="${option.value}"><i></i><p>${option.content}</p></button></li>`);
               if (option.value === NOTDATA) {
                  $selectContainer.find('li').last().find('button').prop('disabled', true);
               }
            });
         } else {
            let _subStep = Object.values(_currentStructural.subStep);
            let _subKey = Object.keys(_currentStructural.subStep);
            _subStep.forEach(function (subStepItem, subStepIndex) {
               let optionHtml = '';
               if (subStepItem.allSelectOption) {
                  optionHtml += `<button class="all_select" type="button" data-value="${_subKey[subStepIndex]}_${SELECTALL}"><span></span><p>${selectAllContent}</p></button>`;
               }
               subStepItem.option.forEach(function (subOption) {
                  optionHtml += `<button class="option_btn" type="button" data-value="${subOption.value}"><p>${subOption.content}</p></button>`;
               });
               $selectContainer.append(`<li><span>${Object.keys(_currentStructural.subStep)[subStepIndex]}<div><em>${multipleSelectionContent}</em></div> </span><div>${optionHtml}</div></li>`);
            });
         }
         if (_currentStructural.anythingOption) {
            $selectContainer.append(`<li><button class="option_btn anything_btn" type="button" data-value="${ANYTHING}"><i></i><p>${anythingContent}</p></button></li>`)
         }
         if (_currentStructural.allSelectOption) {
            $selectContainer.prepend(`<li><button class="all_select" type="button" data-value="${idx + 1}_${SELECTALL}"><span></span><p>${selectAllContent}</p></button></li>`)
         }
         if (idx === _lastFinderIndex) {
            $nextBtn.text(nextLastContent);
         }
         /*** */
         if (idx === 0) {
            $(".option_btn").prop("disabled", false);
         } else {
            // this.optionDisabled();
         }
      }

      /* 선택 옵션 active & 해제 */
      optionActivation(element) {
         let _value = element.data('value');
         let enabledOptions = 0; // All Select 제외한 나머지 버튼 count
         let activeOption = 0; // 현재 클릭된 버튼 count 
         // step 3       
         let step3EnabledOptions = 0; // All Select 제외한 나머지 버튼 count
         let step3ActiveOption = 0; // 현재 클릭된 버튼 count

         $('.option_btn').each(function () {
            if ($(this).attr('disabled') === undefined) {
               enabledOptions++;
            }
         });

         /* 상관없음 옵션 있을 시 활성화 버튼 -1 */
         if ($('.anything_btn').length > 0) {
            enabledOptions--;
         }

         // 항목 매칭된 데이터 뿌리기 & 선택된 데이터 push
         if (idx === 0) {
            // button active 
            $('.option_btn').removeClass('active');
            element.addClass('active');
            applianceFinder.filterUpdate(_value, true);
         }

         if (idx !== 0) {
            if (!element.hasClass('active')) {
               element.addClass('active');

               /* 상관없음 옵션을 선택 했을 때 */
               if (_value === ANYTHING) {
                  // 모두 해제
                  $('.option_btn').each(function () {
                     let _value = $(this).data('value');
                     if ($(this).attr('disabled') === undefined && !$(this).hasClass('anything_btn')) {
                        $(this).hasClass('anything_btn');
                        $(this).removeClass('active');
                        applianceFinder.filterUpdate(_value, false);
                     }
                  });
                  // applianceFinder.filterUpdate(_AllSelectKeyValue, false);
                  $('.all_select').removeClass('active');
               } else {
                  $('.anything_btn').removeClass('active');
                  // applianceFinder.filterUpdate($('.anything_btn').data('value'), false);
               }
               applianceFinder.filterUpdate(_value, true);
            } else {
               // active 해제
               element.removeClass('active');

               if (idx !== 2) {  //step03 제외
                  applianceFinder.filterUpdate(_value, false);
                  // applianceFinder.filterUpdate(_AllSelectKeyValue, false);
                  $('.all_select').removeClass('active');
               } else {
                  //step03 
                  element.siblings('.all_select').removeClass('active');
                  applianceFinder.filterUpdate(_value, false);
                  // applianceFinder.filterUpdate(_AllSelectKeyStep3Value, false);
               }
            }

            if (idx !== 2) {
               // step03 제외
               /* 상관없음 옵션을 선택 했을 때 */
               $('.option_btn').each(function () {
                  if ($(this).attr('disabled') === undefined) {
                     if ($(this).hasClass('active') && !$(this).hasClass('anything_btn')) {
                        activeOption++;
                     }
                  }
               });
               /* 상관없음 옵션을 선택 했을 때 */
               // console.log(activeOption === enabledOptions, activeOption, enabledOptions)
               if (activeOption === enabledOptions) { // active 된 버튼 갯수와 전체버튼의 갯수와 일치 할 때 All Select 버튼 acitve 
                  $('.all_select').addClass('active');
                  // applianceFinder.filterUpdate(_AllSelectKeyValue, true);
               }
            } else {
               // step03
               let _divBtn = element.parent().find('.option_btn');

               _divBtn.each(function () {
                  if ($(this).attr('disabled') === undefined) { // acitve 없고, disabled 없고, All Select 가 아닌 버튼의 kay / value 값 
                     step3EnabledOptions++;
                  }
               });
               _divBtn.each(function () {
                  if ($(this).attr('disabled') === undefined) {
                     if ($(this).hasClass('active')) {
                        step3ActiveOption++
                     }
                  }
               });

               // active 된 버튼 갯수와 전체버튼의 갯수와 일치 할 때 & 부모에 all Select 버튼이 존재 할 때
               if (step3EnabledOptions === step3ActiveOption && element.parent().find('.all_select').length !== 0) {
                  element.parent().find('.all_select').addClass('active');
                  // applianceFinder.filterUpdate(_AllSelectKeyStep3Value, true);
               }
            }
         }
         applianceFinder.optionDataStructure(); // 옵션 구조 초기화 & 해당 옵션 내용 노출
      }

      /* 전체 선택 옵션 active & 해제 */
      allSelectOptionActivation(element) {
         let _step2AnswerBtnActive = 1; // step3 의 active 된 버튼의 count
         let _answerBtnActive = 1; // 버튼 active 카운팅 저장용 (All Select 해제 시 카운팅 수 필요)
         $finderMain.addClass('ready');

         if (idx !== 2) { // step03 제외 
            $('.option_btn').each(function () {
               // active 전체 갯수 카운팅 ++
               if ($(this).attr('disabled') === undefined) {
                  _answerBtnActive++
               }
            });

            // 상관없음 옵션이 존재 할 때 active 되는 갯수 -1
            if ($('.anything_btn').length > 0) {
               _answerBtnActive--;
            }

            // All Select 선택시 모든 옵션이 선택됨
            if (!element.hasClass('active')) {
               $('.option_btn').each(function () {
                  // All Select 선택시 나머지 active 버튼의 key / value 값 배열 삽입
                  if (!$(this).hasClass('active') && $(this).attr('disabled') === undefined) { // active 없고, disabled 없고, All Select 가 아닌 버튼의 kay / value 값                         
                     if (!$(this).hasClass('anything_btn')) { // 상관없음 옵션이 있을 때 제외하고 push
                        applianceFinder.filterUpdate($(this).data('value'), true);
                     }
                  }
                  if ($(this).attr('disabled') === undefined && !$(this).hasClass('anything_btn')) {
                     $(this).addClass('active');
                     $('.all_select').addClass('active');
                  }
               });
               $('.anything_btn').removeClass('active');
               // applianceFinder.filterUpdate($('.all_select').data('value'), true);
               // applianceFinder.filterUpdate($('.anything_btn').data('value'), false); /* 수정요망!!!! <----- */
            } else {
               // All Select 해제 시 전체 데이터 값 삭제 & 선택 해제
               $('.option_btn').removeClass('active');
               $('.all_select').removeClass('active');
               for (let i = 0; i < _answerBtnActive; i++) { // 버튼 active 카운팅 만큼 반복문 실행
                  this.selectedParameters.splice(-1, 1);
               }
               // console.log(this.selectedParameters)
            }
         } else { // step03 
            let _notAllSelectOption = element.siblings(); // AllSelectOption 가 아닌 기존버튼

            // step03 의 active 된 버튼의 count ++
            _notAllSelectOption.each(function () {
               if ($(this).attr('disabled') === undefined) {
                  _step2AnswerBtnActive++;
               }
            });

            // All Select 선택시 모든 옵션이 선택됨
            if (!element.hasClass('active')) {
               element.addClass('active');
               _notAllSelectOption.each(function () {
                  // All Select 선택시 나머지 active 버튼의 key / value 값 배열 삽입
                  if (!$(this).hasClass('active') && $(this).attr('disabled') === undefined) { // active 없고, disabled 없고, All Select 가 아닌 버튼의 kay / value 값 
                     applianceFinder.filterUpdate($(this).data('value'), true);
                  }
                  if ($(this).attr('disabled') === undefined) {
                     $(this).addClass('active');
                  }
               });
            } else {
               // All Select 해제 시 전체 데이터 값 삭제 & 선택 해제
               element.removeClass('active');
               element.siblings().removeClass('active');
               for (let i = 0; i < _step2AnswerBtnActive; i++) { // 버튼 active 카운팅 만큼 반복문 실행
                  this.selectedParameters.splice(-1, 1);
               }
            }
         }
      }

      /* 옵션의 상태 판단 */
      stateOptions(_active) {
         $('.option_btn').each(function () {
            let _this = $(this);
            // if (_active) {
            //    if (_value === SELECTALL) {
            //       if (!_this.hasClass('active') && _this.data('value') !== ANYTHING && _this.attr('disabled') === undefined) {
            //          _optionArray.push(_this);
            //          activeOption++;
            //       }
            //    } else if (_value === ANYTHING) {
            //       if (_this.hasClass('active') && _this.data('value') !== ANYTHING) {
            //          _optionArray.push(_this);
            //       }
            //    } else {
            //       if (_this.data('value') === ANYTHING) {
            //          _optionArray.push(_this);
            //       }
            //    }
            // } else {
            //    if (_value === SELECTALL) {
            //       if (_this.attr('disabled') === undefined && _this.data('value') !== ANYTHING) {
            //          activeOption--;
            //          _optionArray.push(_this);
            //       }
            //    }
            // }

            // active 된 옵션 갯수 카운팅
            // if (_this.hasClass('active')) {
            //    activeOption++;
            // }
            // // 활성화된 옵션 갯수 카운팅
            // if (_this.data('value') !== ANYTHING && _this.attr('disabled') === undefined) {
            //    enabledOptions++;
            // }
         });

      }

      /* 필터 업데이트 추가 & 삭제 */
      filterUpdate(_value, _state) {
         if (_state === true) {
            if (idx === 0) {
               this.selectedParameters = []; 
               this.selectedParameters.push(_value); 

               _currentStructural.option.filter((element) => {
                  if (element.value === applianceFinder.selectedParameters[0]) {
                     applianceFinder.selectedProduct = element.saveImg
                  }
               });
            } else {
               this.selectedParameters.push(_value); // 선택된 value push
            }
         }
         if (_state === false) {
            this.selectedParameters = this.selectedParameters.filter(value => {
               return value !== _value;
            });
         }
         console.log(this.selectedParameters)
         applianceFinder.countingUpdate();
      }

      /* 카운팅 */
      countingUpdate() {
         if (this.stepCount[idx] !== undefined) {
            this.stepCount[idx] = $('.option_btn.active').length;
         } else {
            this.stepCount.push($('.option_btn.active').length);
         }
         // console.log('stepCount : ', this.stepCount);
      }


      /* 선택한 필터 제품 삭제 */
      matchingProductsDelete() {
         $finderMain.addClass('ready');
         $queTitle.css('display', 'none');
         $descHeadWrap.css('display', 'block');

         /* Count 삭제, Select Value 삭제 */
         if (this.stepCount[idx + 1] !== undefined || this.stepCount[idx + 1] === 0) {
            for (let i = 0; i < this.stepCount[this.stepCount.length - 1]; i++) {
               this.selectedParameters.pop();
            }
            this.stepCount.pop();
         }

         /* Option Active */
         for (let i = 0; i < applianceFinder.stepCount.slice(-1)[0]; i++) {
            let value = applianceFinder.selectedParameters[applianceFinder.selectedParameters.length - (1 + i)];
            $('.option_btn').each(function () {
               let _this = $(this);
               let _value = _this.data('value');
               if (value === _value) {
                  _this.addClass('active');
               }
            });
         }

         // taggingEvent(); // 태깅 함수
         applianceFinder.sprayData(true);
      }


      /* 매칭된 제품 버튼 활성화 & 비활성화 */
      optionDisabled() {
         /*** 작업중 코드 */
         // console.log(this.selectedParameters);

         // let isSubset = (array1, array2) => array2.every((element) => array1.includes(element));
         let isSubset = (array1, array2) => array2.every(function (element) {
            console.log('array1 : ', array1, '\n', 'element : ', element)
            return array1.includes(element);
         })

         let selectProduct = [];
         let concatArr = [];

         for (let [key, value] of Object.entries(productSpec)) {
            console.log(key, value)
            if (isSubset(value, this.selectedParameters)) {
               // console.log('value : ', value, '\n','this.selectedParameters : ', this.selectedParameters)
               selectProduct.push(key);
               // console.debug('추출된 제품!! key : ', key)
            }
         }
         // console.log(Object.keys(productSpec));
         // console.log(selectProduct);

         concatArr = '';
         for (let [key, value] of Object.entries(selectProduct)) {
            // console.debug('으하하하하 ', productSpec[value]);
            concatArr += Object.values(productSpec[value]) + ",";
         }

         // console.log(concatArr);

         let concatArrDuplicationDel = [...new Set(concatArr.split(","))];

         console.log("선택한 옵션과 제품에 따라 활성화 되어야 하는 옵션 " + concatArrDuplicationDel);
         $(".option_btn").prop("disabled", true);

         for (let i = 0; i < concatArrDuplicationDel.length - 1; i++) {
            // console.log(concatArrDuplicationDel[i]);
            $('.option_btn[data-value=' + concatArrDuplicationDel[i] + ']').prop("disabled", false);
         }

         if (selectProduct.length > 0) {
            console.debug("선택 후 남은 제품 " + selectProduct);
         } else {
            console.log("선택 후 남은 제품없음");
         }
      }


      /* 옵션 구조 초기화 */
      optionDataStructure() {
         $loadMoreBtn.removeClass('active');
         $learnMoreBtn.removeClass('active');
         $learnMoreBtn.removeAttr('data-popup');
         $learnMoreBtn.removeAttr('id');
         $('.popup_movie_step05 .popup_wrap > div').css('display', 'none');
         $loadMoreBtn.removeAttr('data-link-name');
         $learnMoreBtn.removeAttr('data-link-name');

         // 질문 텍스트 / 디스크립션 생성, 삭제
         if (idx === 2) {
            if ($descDetailWrap.hasClass('open')) {
               $descHeadWrap.css('display', 'none');
            } else {
               $descHeadWrap.css('display', 'block');
            }
         } else {
            $description.css('display', 'none');
            $descHeadWrap.css('display', 'block');
         }

         // 선택 이미지 매칭, 선택 항목 디스크립션 매칭 / load more 버튼 생성
         let optionIsActive = $('.option_btn.active').length > 0;
         if (optionIsActive) {
            $finderMain.addClass('ready');
            $queTitle.css('display', 'none');
            applianceFinder.sprayData(true);
         } else {
            $finderMain.removeClass('ready');
            $description.css('display', 'none');
            $queTitle.css('display', 'block');
            applianceFinder.sprayData(false);
         }
      }


      // 해당 옵션 내용 노출
      sprayData(boolean) {
         let _moreCont;
         let lastValue = this.selectedParameters[this.selectedParameters.length - 1]; // 마지막 value 값
         let exposureData;
         if (idx !== 2) {
            let data = _currentStructural.option.filter(item => {
               return item.value === lastValue
            });
            exposureData = data[0];
         } else {
            exposureData = _currentStructural;
         }
         // console.log(exposureData)

         /* 상관없음 옵션 데이터 미노출 */
         if (!exposureData) {
            $queTitle.css('display', 'block');
            $description.css('display', 'none');
         }

         /* 해당 옵션 데이터 노출 */
         if (boolean && exposureData && exposureData.relevantData) {
            if (exposureData.relevantData.icon) {
               $descIcon.attr('style', 'background-image:url(' + imgPath + exposureData.relevantData.icon + ')');
            }
            if (exposureData.relevantData.qnaScreenImg) {
               $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + exposureData.relevantData.qnaScreenImg + ')');
            }
            if (exposureData.relevantData.description.head) {
               $descHead.text(exposureData.relevantData.description.head);
               $descDetail.text(exposureData.relevantData.description.detail);
               $loadMoreBtn.addClass('active');
               $loadMoreBtn.attr('id', 'descMoreBtn');
               // _moreCont = _selectData[0].content.replace(/(<([^>]+)>)/ig, '');
               // $loadMoreBtn.attr('data-link-name', 'Load More : ' + _moreCont);
            } else if (exposureData.relevantData.description) {
               $descHead.text(exposureData.relevantData.description);
            }
            $loadMoreBtn.removeClass('active');
            $loadMoreBtn.removeAttr('id');

            /* 디크스립션 & 팝업 */
            if (exposureData.relevantData.additionalDesc) {
               $learnMoreBtn.attr('id', 'descMoreBtn');
               $learnMoreBtn.addClass('active');
            }
            if (exposureData.relevantData.interactionPage) {
               $learnMoreBtn.attr('id', 'interactionBtn');
               $learnMoreBtn.addClass('active');
            }
            if (exposureData.relevantData.videoPopup) {
               $learnMoreBtn.attr('id', 'videoMoreBtn');
               $learnMoreBtn.addClass('active');
            }
            if (idx === _lastFinderIndex) {
               $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + 'step07/' + this.selectedProduct.class + '_' + exposureData.relevantData.qnaScreenImg + ')');
            }
         }


         if (!boolean) {
            if (_currentStructural.defaultScreenImg) {
               $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + _currentStructural.defaultScreenImg + ')');
            }
            if (idx === _lastFinderIndex) {
               $qnaImgWrap.attr('style', 'background-image:url(' + imgPath + _currentStructural[0].screenImg.lastScreenImg + ')');
            }
         }
      }
   }

   const applianceFinder = new Subject();

   /* Start */
   applianceFinder.defaultSeting();
   applianceFinder.setMarkupDate();

   /* Next Button */
   $nextBtn.on('click', function () {
      if (idx < _lastFinderIndex) {
         idx++;
      }
      applianceFinder.setMarkupDate();
      // applianceFinder.matchingProductsSave();
   });

   /* Back Button */
   $backBtn.on('click', function () {
      if (idx > 0) {
         idx--;
      }
      applianceFinder.setMarkupDate();
      applianceFinder.matchingProductsDelete();
   });

   /* Option Button */
   $(document).on('click', '.option_btn', function () {
      let element = $(this);
      applianceFinder.optionActivation(element);
   });

   /* All Select Button */
   $(document).on('click', '.all_select', function () {
      let element = $(this);
      applianceFinder.allSelectOptionActivation(element);
   });

   /* Description Button */
   $(document).on('click', '#descMoreBtn', function () {
      $descDetailWrap.css('display', 'block');
      $descHeadWrap.css('display', 'none');
      $descDetailWrap.addClass('open');
   });

   /* Interactive Popup Button */
   $(document).on('click', '#interactionBtn', function () {
      $finderMain.css('display', 'none');
      $('.popup_' + _currentStep).css('display', 'block');
      $('.popup_' + _currentStep).removeClass().addClass('popup_' + _currentStep).addClass('popup_step'); // class 초기화
      $('.popup_' + _currentStep).addClass(interactiveClass);
      $(window).scrollTop(headerHeight);
      if (idx === 5) {
         $('.popup_' + _currentStep).find('.txt_wrap img').each(function (i) {
            $(this).attr('src', imgPath + 'step06/' + selectedProduct[0].class + currentStep.productColorImg[i] + '.png');
         });
      }
   });

   /* Size Popup Button */
   $(document).on('click', '.caution_open_btn', function () {
      $popupStp3.css('display', 'flex');
      $('.popup_step03 .popup_wrap > div').css('display', 'none');
      $('.popup_step03 .' + selectedProduct[0].class).css('display', 'block');
   });

   /* Video Popup Button */
   $(document).on('click', '#videoMoreBtn', function () {
      $('.popup_movie_step05').css('display', 'block');
   });

   /* Detail Description Button */
   $detailCloseBtn.on('click', function () {
      $descDetailWrap.css('display', 'none');
      $descHeadWrap.css('display', 'block');
      $descDetailWrap.removeClass('open');
   });

   /* Video Close Button */
   $popupClose.on('click', function () {
      $(this).parents('.popup_step').css('display', 'none');
      $('.video_wrap').removeClass('play_video');
      $('.popup_movie_step05 .popup_wrap > div').find('video').each(function (i) {
         $('.popup_movie_step05 .popup_wrap > div').find('video')[i].currentTime = 0;
         $('.popup_movie_step05 .popup_wrap > div').find('video')[i].pause();
      });
   });

   /* Interactive Close Button */
   $interactionClose.on('click', function () {
      $quickFinder.css('display', 'block');
      $('.popup_step').css('display', 'none');
      $('.popup_' + currentStep.finderStep).removeClass().addClass('popup_' + currentStep.finderStep).addClass('popup_step'); // class 초기화
   });

   // $('#selectAgainCloseBtn').on('click', function () {
   //    $quickFinder.removeClass('not_matched');
   // })

   // 인트로 애니메이션 없이 처음으로 돌아가기
   $tryAgain.on('click', function () {
      location.href = currentUrl.split('?')[0] + '?intro=no';
   });

   /* Video Play Button */
   $('.video_btn').on('click', function () {
      let _this = $(this);
      if (!_this.parents('.video_wrap').hasClass('play_video')) {
         _this.parents('.video_wrap').addClass('play_video');
         _this.parents('.video_wrap').find('video').get(0).play();
      }
   });

   /* Video Pause Button */
   $('.video_wrap i').on('click', function () {
      let _this = $(this);
      if (_this.parents('.video_wrap').hasClass('play_video')) {
         _this.parents('.video_wrap').removeClass('play_video');
         _this.parents('.video_wrap').find('video').get(0).pause();
      }
   });
}