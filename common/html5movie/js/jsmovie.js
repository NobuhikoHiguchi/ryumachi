/* ===================================================================
File information
 file name   : jsmovie.js
 description : 動画プレーヤー
=================================================================== */
(function($){
    var options;            // オプション値
    var xmlContent;         // XMLデータ

    var playerObj           // プレイヤーの大枠
    var titleObj            // タイトルオブジェクト
    var videoObj;           // ビデオオブジェクト
    var videoHtml;          // ビデオHTMLオブジェクト
    var subtitleObj;        // 字幕欄オブジェクト
    var subtitleWrap;       // 字幕欄外枠オブジェクト
    var commentObj;         // コメント欄オブジェクト
    var commentObj2;        // コメント欄オブジェクト2
    var playBtnObj;         // 再生ボタンオブジェクト
    var pauseBtnObj;        // 一時停止ボタンオブジェクト
    var stopBtnObj;         // 停止ボタンオブジェクト
    var rewindBtnObj;       // 巻戻しボタンオブジェクト
    var forwardBtnObj;      // 早送りボタンオブジェクト
    var seekBarObj;         // シークバーオブジェクト
    var seekPointObj;       // シークポイントオブジェクト
    var timeObj;            // 再生時間オブジェクト
    var volumeBtnObj;       // ボリュームボタンオブジェクト
    var volumeBackObj;      // ボリューム背景オブジェクト
    var volumeBarObj;       // ボリュームバーオブジェクト
    var volumePointObj;     // ボリュームポイントオブジェクト
    var fullScreenBtnObj    // フルスクリーンボタン
    var exlinkBtnObj;       // 関連動画ボタンオブジェクト
    var baseOverLayObj;     // チャンネルメニューの背景オブジェクト
    var OverLayWindowObj;   // チャンネルメニューオブジェクト
    var windowCloseBtnObj;  // チャンネルメニュー閉じるボタンオブジェクト
    var OverLaycontentsObj; // チャンネルメニューコンテンツオブジェクト
    var pickupObj;          // ピックアップオブジェクト
    var prevBtnObj;         // △ボタンオブジェクト
    var nextBtnObj;         // ▽ボタンオブジェクト
    var chapterListObj;     // チャプターリストオブジェクト
    var graybarObj;         // ローディングロールバーオブジェクト
    var percentObj;         // バッファ率オブジェクト
    var loadingBarObj;      // ローディングバーオブジェクト
    var loadingObj;         // ローディング大枠オブジェクト
    var loadingCenterObj;   // ローディング画像オブジェクト
    var tabBtnObj;          // タブレットボタンエリアオブジェクト
    var tabStartBtnObj;     // タブレット用再生ボタンオブジェクト
    var arrowLeftObj;       // 左ボタンオブジェクト
    var arrowRightObj;      // 右ボタンオブジェクト
    var slideUlObj;         // スライドオブジェクト
    var changeWindowObj;    // 入れ替えボタンオブジェクト
    var playerWrapObj;      // プレイヤーの外枠オブジェクト
    var qualityHighBtnObj;  // 高画質ボタンオブジェクト
    var qualityLowBtnObj;   // 低画質ボタンオブジェクト

    var playerName          = '#movie';             // プレイヤーの大枠
    var titleName           = '.ttl';               // タイトル
    var videoName           = 'video';              // ビデオ
    var subtitleName        = '#creditTtl p';       // 字幕欄
    var subtitleWrapName    = '#creditTtl';         // 字幕欄外枠
    var commentName         = '#comment p';         // コメント欄
    var commentName2        = '#comment2 p';        // コメント欄2
    var playBtnName         = '#play';              // 再生ボタン
    var pauseBtnName        = '#pause';             // 一時停止ボタン
    var stopBtnName         = '#stop';              // 停止ボタン
    var rewindBtnName       = '#rew';               // 巻戻しボタン
    var forwardBtnName      = '#ff';                // 早送りボタン
    var seekBarName         = '#barpoint';          // シークバー
    var seekPointName       = '#barpoint span';     // シークポイント
    var timeName            = '#time p';            // 再生時間
    var volumeBtnName       = '#sound';             // ボリュームボタン
    var volumeBackName      = '#volumebar';         // ボリューム背景
    var volumeBarName       = '#barblack';          // ボリュームバー
    var volumePointName     = '#volumepoint span';  // ボリュームポイント
    var fullScreenName      = '#size';              // フルスクリーンボタン
    var exlinkBtnName       = '#exlink a'           // 関連動画ボタン
    var baseOverLayName     = '#baseOverLayWindow'; // チャンネルメニューの背景
    var OverLayWindowName   = '#OverLayWindow';     // チャンネルメニュー
    var windowCloseBtnName  = '#windowClose';       // チャンネルメニュー閉じるボタン
    var OverLaycontentsName = '#OverLaycontents';   // チャンネルメニューコンテンツ
    var pickupName          = '#OverLaycontents section:first';     // ピックアップ
    var prevBtnName         = '#prevBtn';           // △ボタン
    var nextBtnName         = '#nextBtn';           // ▽ボタン
    var graybarName         = '#graybar span';      // ローディングロールバー
    var percentName         = '#percent';           // バッファリング率
    var loadingBarName      = '#loadingBar span';   // ローディングバー
    var loadingName         = '#loading';           // ローディング大枠
    var loadingCenterName   = '#loadingCenter';     // ローディング画像
    var tabBtnName          = '#tabBtn';            // タブレットボタンエリア
    var tabStartBtnName     = '#tabBtn .tabStartBtn';   // タブレット用再生ボタン
    var qualityHighBtnName  = '.quality .switch-on';    // 高画質ボタン
    var qualityLowBtnName   = '.quality .switch-off';   // 低画質ボタン
    var arrowLeftName       = '.arrowLeft';         // 左ボタン
    var arrowRightName      = '.arrowRight';        // 右ボタン
    var changeWindowName    = '#changeWindow a';    // 入れ替えボタン
    var playerWrapName      = '.ie10Shadow';        // プレイヤーの外枠
    var rewindTime          = 15;                   // 巻き戻し時間（秒）
    var forwardTime         = 15;                   // 早送り時間（秒）
    var pageInitial         = 0;                    // ページ数初期値
    var pageLimit           = 5;                    // ページ表示件数
    var pageLimit2          = 3;                    // ページ表示件数2
    var typeA               = 'a';                  // プレーヤータイプ(a)
    var typeB               = 'b';                  // プレーヤータイプ(b)
    var typeC               = 'c';                  // プレーヤータイプ(c)
    var seekBarFlag         = false;                // シークバー操作中フラグ
    var leftWith            = '640';                // typeB：左コンテンツの幅
    var rightWith           = '326';                // typeB：右コンテンツの幅
    var leftHeight          = '361';                // typeB：左コンテンツの高さ
    var rightHeight         = '183';                // typeB：左コンテンツの高さ
    var changeWindowFlag    = 0;                    // 入れ替えフラグの設定
    var slideClassName      = 'slideImg';           // スライドイメージに付与するclass名
    var arrowUpN            = '/common/html5movie/images/arrow_up_n.png';       // △画像名（ノーマル）
    var arrowDownN          = '/common/html5movie/images/arrow_down_n.png';     // ▽画像名（ノーマル）
    var arrowUpG            = '/common/html5movie/images/arrow_up_g.png';       // △画像名（非選択）
    var arrowDownG          = '/common/html5movie/images/arrow_down_g.png';     // ▽画像名（非選択）
    var status              = 0;                    // ステータス
    var statusPlay          = 1;                    // 再生中
    var statusPause         = 2;                    // 一時停止中
    var statusStop          = 3;                    // 停止中
    var playBtnImgN         = '/common/html5movie/images/btn_play.png';       // 再生ボタン画像
    var playBtnImgO         = '/common/html5movie/images/btn_play_o.png';     // 再生ボタン画像(hover)
    var playBtnImgOTab      = '/common/html5movie/images/btn_tab_play_o.png'; // 再生ボタン画像(hover,tablet)
    var pauseBtnImgN        = '/common/html5movie/images/btn_pause.png';      // 一時停止ボタン画像
    var pauseBtnImgO        = '/common/html5movie/images/btn_pause_o.png';    // 一時停止ボタン画像(hover)
    var pauseBtnImgOTab     = '/common/html5movie/images/btn_tab_pause_o.png';// 一時停止ボタン画像(hover,tablet)
    var stopBtnImgN         = '/common/html5movie/images/btn_stop.png';       // 停止ボタン画像
    var stopBtnImgO         = '/common/html5movie/images/btn_stop_o.png';     // 停止ボタン画像(hover)
    var stopBtnImgOTab      = '/common/html5movie/images/btn_tab_stop_o.png'; // 停止ボタン画像(hover,tablet)
    var titleNameSp         = 'h1';                         // タイトル(SP)
    var chapterListNameSp   = 'section :first';             // チャプターリスト(SP)
    var posterNoImage       = 'xml/sp_images/no_img.jpg';   // posterのno image
    var qualityHigh         = 'h';          // 高画質
    var qualityLow          = 'l';          // 低画質
    var qualityHighFilePart = '.mp4';       // 高画質ファイル名の一部
    var qualityLowFilePart  = '_l.mp4';     // 低画質ファイル名の一部
    var rewFlag             = false;        // 巻き戻しボタン操作中フラグ
    var ffFlag              = false;        // 早送りボタン操作中フラグ

    var fullScreenClassName = 'fullScreen';
    var qualityStatus = qualityHigh;

    // PC
    $.fn.jsMovie = function(config){
        // オプション設定
        options = $.extend({
            xmlPath: null,              // xmlパス
            rewindTime : rewindTime,    // 巻き戻し時間（秒）
            forwardTime : forwardTime,  // 早送り時間（秒）
            pageLimit : pageLimit,      // ページ表示件数
        }, config);

        return this.each(function() {
            // XMLファイルの読み込み（読み込み失敗時は処理終了）
            if (xmlLoad(options.xmlPath) === false) return;

            // オブジェクトの取得
            playerObj          = $(playerName);
            titleObj           = $(titleName);
            videoObj           = $(videoName);
            subtitleObj        = $(subtitleName);
            commentObj         = $(commentName);
            playBtnObj         = $(playBtnName);
            pauseBtnObj        = $(pauseBtnName);
            stopBtnObj         = $(stopBtnName);
            rewindBtnObj       = $(rewindBtnName);
            forwardBtnObj      = $(forwardBtnName);
            seekBarObj         = $(seekBarName);
            seekPointObj       = $(seekPointName);
            volumeBtnObj       = $(volumeBtnName);
            volumeBackObj      = $(volumeBackName);
            volumeBarObj       = $(volumeBarName);
            volumePointObj     = $(volumePointName);
            fullScreenBtnObj   = $(fullScreenName);
            timeObj            = $(timeName);
            exlinkBtnObj       = $(exlinkBtnName + ':first');
            baseOverLayObj     = $(baseOverLayName);
            OverLayWindowObj   = $(OverLayWindowName);
            windowCloseBtnObj  = $(windowCloseBtnName);
            OverLaycontentsObj = $(OverLaycontentsName);
            pickupObj          = $(pickupName);
            graybarObj         = $(graybarName);
            percentObj         = $(percentName);
            loadingBarObj      = $(loadingBarName);
            loadingObj         = $(loadingName);
            loadingCenterObj   = $(loadingCenterName);
            tabBtnObj          = $(tabBtnName);
            tabStartBtnObj     = $(tabStartBtnName);
            qualityHighBtnObj  = $(qualityHighBtnName);
            qualityLowBtnObj   = $(qualityLowBtnName);

            // タブレットの場合
            if (isTablet()) {
                $(tabBtnName).show();
            } else {
                if (xmlContent.find('content').attr('type') == typeB) {
                    $(loadingName).show();
                } else {
                    $(loadingCenterName).show();
                }
            }

            // タイトルの設定
            setTitle();

            // ビデオの設定
            setVideo();

            // 字幕の設定
            setSubtitle();

            // コメントの設定
            setComment();

            // ボタンイベントの設定
            setBtnEvent();

            // 各種イベントの設定
            setEvent();

            // チャンネルメニューの設定
            setChannelMenu();

            if (xmlContent.find('content').attr('type') == typeA) {
                // チャプターリストの設定（タイプA）
                prevBtnObj     = $(prevBtnName);
                nextBtnObj     = $(nextBtnName);
                chapterListObj = prevBtnObj.parent();
                setChapterListTypeA();
            }

            if (xmlContent.find('content').attr('type') == typeB) {
                // チャプターの表示数を変更
                options.pageLimit = pageLimit2;

                // コメント2の設定
                commentObj2 = $(commentName2);
                setComment2();

                // チャプターリストの設定（タイプB）
                prevBtnObj     = $(prevBtnName);
                nextBtnObj     = $(nextBtnName);
                chapterListObj = prevBtnObj.parent();
                setChapterListTypeB();

                // スライドの設定
                arrowLeftObj  = $(arrowLeftName);
                arrowRightObj = $(arrowRightName);
                slideUlObj    = arrowLeftObj.parent();
                setSlide();

                // 入れ替えの設定
                subtitleWrap = $(subtitleWrapName);
                changeWindowObj = $(changeWindowName);
                playerWrapObj   = $(playerWrapName);
                setChangeWindow();

                // 初期に画面入れ替え
                changeVideoAndSlide();
                tabBtnObj.show()

                if ($.browser.msie) {
                    stop();
                    play();
                }
            }

            // タブレットの場合
            if (isTablet()) {
                settingTablet();
            } else {
                tabBtnObj.remove();
            }
        });
    }

    // SP
    $.fn.jsMovieSp = function(config){
        // オプション設定
        options = $.extend({
            xmlPath: null,              // xmlパス
        }, config);

        return this.each(function() {
            // XMLファイルの読み込み（読み込み失敗時は処理終了）
            if (xmlLoad(options.xmlPath) === false) return;

            titleObj           = $(titleNameSp);
            chapterListObj     = $(chapterListNameSp);

            // タイトルの設定
            titleObj.html(xmlContent.find('title').text());

            // チャプターリストの設定
            xmlContent.find('movie chapter').each(function(){
                // 時間計算
                var duration = "";
                if(typeof $(this).attr('duration') !== 'undefined') {
                    duration = '<p class="time">' + timeConversion($(this).attr('duration')) + '</p>';
                }

                var poster;
                if ($(this).attr('poster') == undefined || $(this).attr('poster') == "") {
                    poster = posterNoImage;
                } else {
                    poster = $(this).attr('poster');
                }

                var html;
                html  = '<a href="' + $(this).attr('videourl') + '">';
                html += '<div class="chapter">';
                html += '<div class="img"><img src="' + poster + '" width="110" height="82" alt="" /></div>';
                html += '<div class="txt">';
                html += '<p>' + $(this).attr('name') + '</p>';
                html += duration;
                html += '</div>';
                html += '</div></a>';

                // HTMLを出力
                chapterListObj.append(html);
            });

            // チャンネルメニューXML読み込み
            var channelData;
            $.ajax({
                url: xmlContent.find('content').attr('rootMenuXml'),
                type: 'get',
                dataType: 'xml',
                timeout: 1000,
                async: false,
                success: function(data) {
                    channelData = $(data);
                },
                error: function(data) {
                    return false;
                }
            });

            // ピックアップの各値の取得
            var pickupPath     = channelData.find('pickup').attr('path');
            var thumbnail      = channelData.find('pickup thumbnail').attr('href');
            var pickupTitle    = channelData.find('pickup title').text();
            var pickupDescript = channelData.find('pickup description').text();

            // ピックアップの設定
            $('.pickup .img a').attr('href', pickupPath);
            $('.pickup .img a img').attr('src', thumbnail);
            $('.pickup .txt .tit a').attr('href', pickupPath);
            $('.pickup .txt .tit a').html(pickupTitle);
            $('.pickup .txt p').not('.tit').html(pickupDescript);

            // 関連動画
            var categoryCount = 1;
            channelData.find('category').each(function() {
                var xmlCategory = $(this);
                var className   = "category" + categoryCount;

                // カテゴリー出力
                var categoryHtml;
                categoryHtml  = '<h3>' + xmlCategory.attr('name') + '</h3>';
                categoryHtml += '<span class="' + className + '"></span>';
                $('section:last').after(categoryHtml);
                var category = $('.' + className);

                // サブカテゴリー
                var subCategoryCount = 1;
                xmlCategory.find('subCategory').each(function() {
                    var xmlSubCategory       = $(this);
                    var subCategoryClassName = "subCategory" + subCategoryCount;

                    category.append('<section class="subCat ' + subCategoryClassName + '"><h4>' + xmlSubCategory.attr('name') + '</h4></section>');
                    var subCategory = $('.' + subCategoryClassName, category);

                    // コンテンツ
                    var contentsCount = 1;
                    xmlSubCategory.find('contents').each(function() {
                        var xmlContents       = $(this);
                        var contentsClassName = "contents" + contentsCount;

                        subCategory.append('<p class="tit"><a href="' + xmlContents.attr('path') + '">' + xmlContents.find('description').text() + '</a></p>');

                        // コンテンツのカウントアップ
                        contentsCount++;
                    });

                    // サブカテゴリーのカウントアップ
                    subCategoryCount++;
                });

                // カテゴリーのカウントアップ
                categoryCount++;
            });
        });
    }

    /**
     * XML読み込み
     * @param xmlPath
     */
    function xmlLoad(xmlPath) {
        $.ajax({
            url: xmlPath,
            type: 'get',
            dataType: 'xml',
            timeout: 1000,
            async: false,
            success: function(data) {
                xmlContent = $(data);
            },
            error: function(data) {
                return false;
            }
        });
    }

    /**
     * タイトルの設定
     */
    function setTitle() {
        titleObj.html(xmlContent.find('title').text());
    }

    /**
     * ビデオの設定
     */
    function setVideo() {
        // ビデオタグ追加
        playerObj.append('<video></video>');
        videoObj = $(videoName);

        // 動画ソース、画質切り替えボタン
        if (xmlContent.find('content').attr('type') == typeA) {
            videoObj.attr('src', xmlContent.find('movie chapter').attr('videourl'));
            if (xmlContent.find('movie chapter').attr('quality') != 1) {
                qualityHighBtnObj.hide();
                qualityLowBtnObj.hide();
            }
        } else {
            videoObj.attr('src', xmlContent.find('movie').attr('videourl'))
            if (xmlContent.find('movie').attr('quality') != 1) {
                qualityHighBtnObj.hide();
                qualityLowBtnObj.hide();
            }
        }

        // 属性設定
        videoObj.attr('width', xmlContent.find('movie').attr('width'))
                .attr('height', xmlContent.find('movie').attr('height'));

        // ビデオHTMLオブジェクト格納・動画読み込み
        videoHtml = videoObj.get(0);
        videoHtml.load();
    }

    /**
     * 字幕の設定
     */
    function setSubtitle(caption) {
        var captionData;
        var captionPath = '';
        var pathArray   = options.xmlPath.split('/');

        // 字幕パスの取得
        if(caption === undefined) {
            if (xmlContent.find('content').attr('type') == typeA) {
                caption = xmlContent.find('movie chapter').attr('caption');
            } else {
                caption = xmlContent.find('movie').attr('caption');
            }
        }

        // xmlへのパス作成
//        if (pathArray.length == 1) {
//            captionPath = caption;
//        } else {
//            for (i = 0; i < pathArray.length - 1; i++) {
//                if (captionPath != '') {
//                    captionPath += '/';
//                }
//                captionPath += pathArray[i];
//            }
//            captionPath += '/' + caption;
//        }
        captionPath = caption;

        // 字幕ファイルの指定が有る場合のみ
        if(typeof caption !== 'undefined') {
            // 字幕データの読み込み
            $.ajax({
                url: captionPath,
                type: 'get',
                dataType: 'xml',
                timeout: 1000,
                async: false,
                success: function(data) {
                    captionData = $(data);
                },
                error: function(data) {
                    return false;
                }
            });

            // 字幕表示イベントを付与する
            var minTime = 0;
            captionData.find('body p').each(function() {
                subtitleObj.css('display', 'block');
                var cap   = $(this);
                var begin = cap.attr('begin').replace('s', '');
                var end   = cap.attr('end').replace('s', '');

                // 各々の時間になった際、表示・非表示処理を行う
                videoObj.bind("timeupdate", function() {
                    if(videoHtml.currentTime >= begin - 1) {
                        subtitleObj.html(cap.text());
                    }
                    if(videoHtml.currentTime > end) {
                        subtitleObj.html('');
                    }
                });

                // 字幕の最小時間を取得
                if(minTime >= parseFloat(begin) || minTime == 0) {
                    minTime = begin;
                }
            });

            // 字幕の最小時間以前は字幕を表示させないよう設定
            videoObj.bind("timeupdate", function() {
                if(videoHtml.currentTime < minTime - 1) {
                    subtitleObj.html('');
                }
            });
        }
    }

    /**
     * コメントの設定
     */
    function setComment() {
        // コメント欄へ出力
        commentObj.html(xmlContent.find('description').text());
    }

    /**
     * コメント2の設定
     */
    function setComment2() {
        // コメント欄2へ出力
        commentObj2.html(xmlContent.find('body').text());
    }

    /**
     * ボタンイベントの設定
     */
    function setBtnEvent() {
        // 再生ボタンにイベント付与
        playBtnObj.click(function(){
            play();
            tabBtnObj.hide();
        });

        // 一時停止ボタンにイベント付与
        pauseBtnObj.click(function(){
            pause();
        });

        // 停止ボタンにイベント付与
        stopBtnObj.click(function(){
            stop();
        });

        // 巻き戻しボタンにイベント付与
        rewindBtnObj.click(function(){
            play();
            videoHtml.currentTime = videoHtml.currentTime - options.rewindTime;

            rewFlag = true;
        });

        // 早送りボタンにイベント付与
        forwardBtnObj.click(function(){
            play();
            videoHtml.currentTime = videoHtml.currentTime + options.forwardTime;

            ffFlag = true;
        });

        // シークバー操作のイベント付与
        addEventSeekBar();

        // ボリュームバー操作のイベント付与
        addEventVolumeBar();

        // フルスクリーンボタンのイベント付与
        addEventFullScreen();

        // 時間経過毎のイベント
        videoObj.bind("timeupdate", function() {
            // シークバー操作・時間表示
            controlSeekBar();
        });

        // 高画質ボタンにイベント付与
        qualityHighBtnObj.click(function(){
            chengeQuality(qualityHigh);
        });

        // 低画質ボタンにイベント付与
        qualityLowBtnObj.click(function(){
            chengeQuality(qualityLow);
        });
    }

    /**
     * 画質の変更
     */
    function chengeQuality(quality) {
        if (qualityStatus == quality) {
            return;
        }

        // 一時停止
        pause();

        var src = videoObj.attr('src');

        var currentTime = videoHtml.currentTime

        if (qualityStatus == qualityHigh) {
            src = src.replace(qualityHighFilePart, qualityLowFilePart);
        } else {
            src = src.replace(qualityLowFilePart, qualityHighFilePart);
        }

        // 動画切替
        videoObj.attr('src', src);

        // 動画読み込み
        videoHtml.load();

        if (navigator.userAgent.match(/Mac OS X ([0-9]+)[_\.]([0-9])[_\.]?([0-9]?)/)) {
            videoObj.bind("canplaythrough", setCurrentTimeMacSafari);
        } else {
            videoObj.bind("canplay", setCurrentTime);
        }

        // タイプA
        if (xmlContent.find('content').attr('type') == typeA) {
            $('#exlink li.chapter').each(function(){
                if ($(this).attr('quality') != 1) {
                    return;
                }

                var videoUrl = $(this).attr('videourl');
                if (qualityStatus == qualityHigh) {
                    videoUrl = videoUrl.replace(qualityHighFilePart, qualityLowFilePart);
                } else {
                    videoUrl = videoUrl.replace(qualityLowFilePart, qualityHighFilePart);
                }
                $(this).attr('videourl', videoUrl);
            });
        }

        qualityStatus = quality;

        function setCurrentTime() {
            videoHtml.currentTime = currentTime;
            play();
            tabBtnObj.hide();
            videoObj.unbind("canplay", setCurrentTime);
        }

        function setCurrentTimeMacSafari() {
            videoHtml.currentTime = currentTime;
            play();
            tabBtnObj.hide();
            videoObj.unbind("canplaythrough", setCurrentTime);
        }
    }

    /**
     * 再生
     */
    function play() {
        var btnImag = playBtnImgO;
        if(isTablet() && $('body').attr('class') == fullScreenClassName) {
            btnImag = playBtnImgOTab;
        }
        playBtnObj.css('background', 'url("' + btnImag + '") no-repeat scroll left center transparent');
        pauseBtnObj.css('background', '');
        stopBtnObj.css('background', '');
        videoHtml.play();
        status = statusPlay;
        tabBtnObj.hide();
    }

    /**
     * 一時停止
     */
    function pause() {
            var btnImag = pauseBtnImgO;
            if(isTablet() && $('body').attr('class') == fullScreenClassName) {
                btnImag = pauseBtnImgOTab;
            }
            playBtnObj.css('background', '');
            pauseBtnObj.css('background', 'url("' + btnImag + '") no-repeat scroll left center transparent');
            stopBtnObj.css('background', '');

        if (status != statusStop) {
            videoHtml.pause();
            status = statusPause;
        }
    }

    /**
     * 停止
     */
    function stop() {
        var btnImag = stopBtnImgO;
        if(isTablet() && $('body').attr('class') == fullScreenClassName) {
            btnImag = stopBtnImgOTab;
        }
        playBtnObj.css('background', '');
        pauseBtnObj.css('background', '');
        stopBtnObj.css('background', 'url("' + btnImag + '") no-repeat scroll left center transparent');
        videoHtml.pause();
        videoHtml.currentTime = 0;
        status = statusStop;
    }

    /**
     * シークバーのイベントを付与します
     */
    function addEventSeekBar() {
        // 初期位置指定
        seekPointObj.css('left', '0%');

        seekBarObj.mousedown(function(e) {
            $('#bar').mousemove(function(e){
                // シークバー操作中
                seekBarFlag = true;

                // 再生一時停止
                pause();

                // バッファ表示
                graybarObj.show();

                // シークバーの長さを取得
                barWidth = seekBarObj.width();

                // シークバー上の座標を取得
                point = e.pageX - seekBarObj.offset().left;

                // バーの表示位置計算
                left = point / barWidth * 100;

                // 0～100の範囲外にいかないよう対策
                if (left < 0) {
                    left = 0;
                }
                if (left > 100) {
                    left = 100;
                }

                // バーの表示位置変更
                seekPointObj.css('left', left + '%');

                // 再生時間の計算
                time = getVideoTime() * (left / 100);

                // 再生時間を超えないよう対策
                if (time >= videoHtml.duration) {
                    time = videoHtml.duration - 0.1;
                }

                // 再生時間設定
                videoHtml.currentTime = time;
            });

            $(document).mouseup(function(e){
                // シーク操作終了
                seekBarFlag = false;

                // 再生開始
                play();

                // タブレット用
                tabBtnObj.hide();

                // バッファ非表示
                graybarObj.show();

                // チャプターのページを設定
                setChapterPage();

                // マウスイベント削除
                $('#bar').unbind('mousemove');
                $(this).unbind('mouseup');
            });
        });
    }

    /**
     * ボリュームバーのイベントを付与します
     */
    function addEventVolumeBar() {
        // 初期値の設定
        videoHtml.volume = 0.5;
        var position = (1 - videoHtml.volume) * 100;
        volumePointObj.css('top', position + '%');
        volumeBackObj.hide();

        // ボリュームの表示・非表示
        volumeBtnObj.mouseover(function() {
            volumeBackObj.show();
        });
        volumeBackObj.mouseover(function() {
            volumeBackObj.show();
        });
        volumeBackObj.mouseout(function() {
            volumeBackObj.hide();
        });
        volumeBtnObj.mouseout(function() {
            volumeBackObj.hide();
        });

        // ボリュームバー操作のイベント付与
        volumePointObj.mousedown(function(e) {
            $(document).mousemove(function(e){
                // ボリュームバーの長さを取得
                barHeight = volumeBarObj.outerHeight();

                // ボリュームバー上の座標を取得
                if(volumeBarObj.offset().top == 0) return;
                point = e.pageY - volumeBarObj.offset().top;

                // ボリュームスライダーの表示位置計算
                position = point / barHeight * 100;

                // 0～100の範囲外にいかないよう対策
                if (position < 0) {
                    position = 0;
                }
                if (position > 100) {
                    position = 100;
                }

                // スライダーの表示位置変更
                volumePointObj.css('top', position + '%');

                // 音量調節
                videoHtml.volume = 1 -  position / 100;

            });

            // イベントの削除
            $(document).mouseup(function(e){
                $(this).unbind("mousemove");
            });
        });
    }

    /**
     * シークバー操作・時間表示
     */
    function controlSeekBar() {
        // 再生時間・動画時間表示
        times = timeConversion(getCurrentVideoTime());
        timeObj.text(times);

        // タブレットの場合
        if(isTablet()) {
            // フルスクリーン時
            if ($('body').attr('class') == fullScreenClassName) {
                barTime = videoHtml.currentTime / videoHtml.duration * 100 * 0.98 + '%';
            // 非フルスクリーン時
            } else {
                barTime = videoHtml.currentTime / videoHtml.duration * 100 * 0.94 + '%';
            }
            seekBarObj.css('width', barTime);
        // タブレット以外の場合
        } else {
            barTime = videoHtml.currentTime / videoHtml.duration * 100 + '%';
            seekPointObj.css('left', barTime);
        }
    }

    /**
     * フルスクリーンボタンのイベントを付与します
     */
    function addEventFullScreen() {
        var containerWidth;
        var containerHeight;
        var movieAreaWidth;
        var movieWidth;
        var movieheight;
        var windowWidth;
        var windowHeight;
        var windowLeft;
        var windowTop;

        var bodyClass      = $('body').attr('class');

        // フルスクリーンボタンにイベント付与
        fullScreenBtnObj.click(function(){
            containerWidth  = $('#container').width();
            containerHeight = $('#container').height();
            movieAreaWidth  = $('#movieArea').width();
            movieWidth      = $('#movie').width();
            movieheight     = $('#movie').height();
            windowWidth     = window.outerWidth;
            windowHeight    = window.outerHeight;
            windowLeft      = window.screenLeft;
            windowTop       = window.screenTop;

            // ユーザーエージェント
            var ua = navigator.userAgent;

            // フルスクリーン時
            if ($('body').attr('class') == fullScreenClassName) {
                releaseFullScreen();
            // 非フルスクリーン時
            } else {
                // typeBの場合
                if (xmlContent.find('content').attr('type') == typeB) {
                    // 入れ替え済みの場合
                    if (changeWindowFlag == 0) {
                        // ビデオとスライドの入れ替え
                        changeVideoAndSlide();

                        // フラグ変更対策
                        changeWindowFlag = 0;
                    }

                    arrowLeftObj.hide();
                    arrowRightObj.hide();

                    if (!isTablet()) {
                        var rate = screen.width / screen.height;
                        if (rate > 1.7778) {
                            if ($.browser.msie) {
                                $('.slideImg').css({height: $(window).height() - 68}).removeAttr('height').removeAttr('width');
                            } else {
                                $('.slideImg').css({height: screen.height - 72}).removeAttr('height').removeAttr('width');
                            }
                        } else {
                            $('.slideImg').css({width: '100%'}).removeAttr('height').removeAttr('width');
                        }
                    }
                }

                // classの入れ替え
                $('body').removeClass();
                $('body').addClass(fullScreenClassName);

                // スタイル操作
                videoObj.css({width: '100%', height: '100%'});

                // IEの場合
                if ($.browser.msie) {
                    // ウィンドウ位置とサイズの変更
                    $(window).scrollTop(0);
                    moveTo(0,0);
                    resizeTo(screen.width, screen.height);

                    // スタイル操作
                    $('#movieArea').css({width: window.outerWidth});
                    $('#movie').css({width: '100%', height: $(window).height() - 68});
                    if (ua.match('Trident')) {
                        // 制御部の幅 IE9-10
                        $('#bar').css({width: document.body.offsetWidth - 370 + 'px'});
                    } else {
                        // 制御部の幅 IE11
                        $('#bar').css({width: window.parent.screen.width - 370 + 'px'});
                    }
                // タブレットの場合
                } else if (isTablet()) {
                    tabletFullScreen();

                    // ボタンの変更
                    if (status == statusPlay) {
                        playBtnObj.css('background', 'url("' + playBtnImgOTab + '") no-repeat scroll left center transparent');
                    } else if (status == statusPause) {
                        pauseBtnObj.css('background', 'url("' + pauseBtnImgOTab + '") no-repeat scroll left center transparent');
                    } else if (status == statusStop) {
                        stopBtnObj.css('background', 'url("' + stopBtnImgOTab + '") no-repeat scroll left center transparent');
                    }

                    // 回転時の処理
                    $(window).bind("load orientationchange resize",function(){
                        tabletFullScreen();
                    });
                // IE以外の場合
                } else {
                    $('#movieArea').css({width: screen.width});
                    $('#movie').css({width: '100%', height: screen.height - 72});
                    if (ua.match('MSIE') || ua.match('Trident')) {
                        $('body').get(0).msRequestFullscreen();
                    } else {
                        $('body').get(0).webkitRequestFullScreen();
                    }
                    // 制御部の幅 PCモダンブラウザ
                    $('#bar').css({width: window.parent.screen.width - 370 + 'px'});
                }
            }
        });

        // Escキー押下時
        $(window).keydown(function(e){
            if(e.keyCode == 27){
                releaseFullScreen();
            }
        });

        // フルスクリーン解除時のイベント付与
        document.onwebkitfullscreenchange = function() {
            if (!document.webkitIsFullScreen) {
                releaseFullScreen();
            }
        };

        /**
         * タブレット用フルスクリーン処理
         */
        function tabletFullScreen() {
            if ($('body').attr('class') != fullScreenClassName) {
                return;
            }
            $('#movieArea').css({width: ''});
            $('#movie').css({width: '', height: ''});

            // スクロール位置をtopへ
            $('body').scrollTop(0);

            // ヨコ
            if(window.innerWidth > $(window).height()) {
                // スタイル操作
                if (isAndroid()) {
                    $('#container').css({height: 'initial'});
                    $('#movieArea').css({width: (window.innerHeight - 104) * 1.7778});
                    $('#movie').css({width: '100%', height: window.innerHeight - 104});
                    if (xmlContent.find('content').attr('type') == typeB) {
                        $('.slideImg').css({height: window.innerHeight - 104}).removeAttr('height').removeAttr('width');
                    }
                } else {
                    $('#container').css({height: 'initial'});
                    $('#movieArea').css({width: '976px'});
                    $('#movie').css({width: '100%', height: '549px'});
                    if (xmlContent.find('content').attr('type') == typeB) {
                        $('.slideImg').css({height: '549px'}).removeAttr('height').removeAttr('width');
                    }
                }
                // 制御部の幅 タブレット
                $('#bar').css({width: window.innerWidth - 580 + 'px'});
            // タテ
            } else {
                // スタイル操作
                $('#movieArea').css({width: '100%'});
                $('#movie').css({width: '100%', height: window.innerHeight - 105});

                // typeBの場合
                if (xmlContent.find('content').attr('type') == typeB) {
                    $('.slideImg').css({width: '100%'}).removeAttr('height').removeAttr('width');
                }
                // 制御部の幅 タブレット
                $('#bar').css({width: window.innerWidth - 580 + 'px'});
            }
        }

        // フルスクリーン解除
        function releaseFullScreen() {
            // ユーザーエージェント
            var ua = navigator.userAgent;

            // classの入れ替え
            $('body').removeClass();
            $('body').addClass(bodyClass);

            // スタイル操作
            videoObj.css({width: '', height: ''});
            $('#container').css({height: ''});
            $('#movieArea').css({width: ''});
            $('#movie').css({width: '', height: ''});
            $('.slideImg').css({width: '', height: ''});

            // タブレットの場合
            if (isTablet()) {
                // ボタンの変更
                if (status == statusPlay) {
                    playBtnObj.css('background', 'url("' + playBtnImgO + '") no-repeat scroll left center transparent');
                } else if (status == statusPause) {
                    pauseBtnObj.css('background', 'url("' + pauseBtnImgO + '") no-repeat scroll left center transparent');
                } else if (status == statusStop) {
                    stopBtnObj.css('background', 'url("' + stopBtnImgO + '") no-repeat scroll left center transparent');
                }
            // IEの場合
            } else if ($.browser.msie) {
                // ウィンドウサイズと位置を戻す
                resizeTo(windowWidth, windowHeight);
                moveTo(windowLeft,windowTop);
            // IE以外の場合
            } else {
                // フルスクリーン解除
                if (ua.match('MSIE') || ua.match('Trident')) {
                    document.msExitFullscreen();
                } else {
                    document.webkitCancelFullScreen();
                }
            }

            // typeBの場合
            if (xmlContent.find('content').attr('type') == typeB) {
                // 入れ替え済みの場合
                if (changeWindowFlag == 0) {
                    // フラグ変更対策
                    changeWindowFlag = 1;

                    // ビデオとスライドの入れ替え
                    changeVideoAndSlide();
                } else {
                    $('.' + slideClassName).attr('width', leftWith).attr('height', leftHeight);

                    // ボタンの切り替え
                    arrowLeftObj.eq(1).show();
                    arrowRightObj.eq(1).show();
                }
            }

            // 制御部の幅
            $('#bar').css({width: ''});
        };
    }

    /**
     * 各種イベントの設定
     */
    function setEvent() {
        // 時間経過時
        videoObj.bind("timeupdate", function() {
            // バッファーの設定
            setbuffer();
        });

        setbuffer();

        // 再開可能になった場合
        videoObj.bind("canplay", function() {
            if (status != statusStop) {
                // バッファーの設定
                setbuffer();
                play();
            }
        });

        // データダウンロードの中断時
        videoObj.bind("stalled", function() {
            // 再開可能になった場合
            videoObj.bind("canplay", function() {
                play();
            });
        });
    }

    /**
     * バッファーの設定
     */
    function setbuffer() {
        // バッファー値が取得できた場合
        if (videoHtml.buffered.length > 0) {
            // バッファの計算
            var buf = parseInt(videoHtml.buffered.end(0) / (videoHtml.duration - 1) * 100);

            // 範囲対策：100まで
            if (buf > 100) buf = 100;

            // 値のセット
            graybarObj.css('width', buf + '%');
            percentObj.text(buf);
            loadingBarObj.css('width', buf + '%');

            // シークバー操作中以外
            if (!seekBarFlag) {
                // バッファリングが完了したら非表示
                if (videoHtml.duration <= videoHtml.buffered.end(0)) {
                    loadingObj.hide();
                    loadingCenterObj.hide();
                    graybarObj.hide();
                }

                // 動画上のローディング表示・非表示
                if (videoHtml.duration - 1 >= videoHtml.buffered.end(0) && !videoHtml.paused) {
                    loadingObj.hide();
                    loadingCenterObj.hide();
                } else if (videoHtml.duration - 1 >= videoHtml.buffered.end(0) && videoHtml.paused) {
//                    loadingObj.show();
                    if(status != 0) {
                        loadingCenterObj.show();
                    }
                }

                if (buf >= 100) {
                    loadingObj.hide();
                    loadingCenterObj.hide();
                    graybarObj.hide();
                }
            }
        }
    }

    /**
     * チャンネルメニューの設定
     */
    function setChannelMenu() {
        // チャンネルメニューXML読み込み
        var channelData;
        $.ajax({
            url: xmlContent.find('content').attr('rootMenuXml'),
            type: 'get',
            dataType: 'xml',
            timeout: 1000,
            async: false,
            success: function(data) {
                channelData = $(data);
            },
            error: function(data) {
                return false;
            }
        });

        // ピックアップの各値の取得
        var pickupPath     = channelData.find('pickup').attr('path');
        var thumbnail      = channelData.find('pickup thumbnail').attr('href');
        var pickupTitle    = channelData.find('pickup title').text();
        var pickupDescript = channelData.find('pickup description').text();

        // ピックアップの値のセット
        pickupObj.find('p a').attr('href', pickupPath);
        pickupObj.find('img').attr('src', thumbnail);
        pickupObj.find('div h6 a').attr('href', pickupPath);
        pickupObj.find('div h6 a').html(pickupTitle);
        pickupObj.find('div p').html(pickupDescript);

        // カテゴリー出力
        var categoryCount = 1;
        channelData.find('category').each(function() {
            var xmlCategory = $(this);
            var className   = "category" + categoryCount;

            OverLaycontentsObj.append('<hr>');
            OverLaycontentsObj.append('<section class="' + className + '"><h4>' + xmlCategory.attr('name') + '</h4></section>');
            var category = $('.' + className);

            // サブカテゴリー
            var subCategoryCount = 1;
            xmlCategory.find('subCategory').each(function() {
                var xmlSubCategory       = $(this);
                var subCategoryClassName = "subCategory" + subCategoryCount;

                category.append('<section class="' + subCategoryClassName + '"><h5>' + xmlSubCategory.attr('name') + '</h5></section>');
                var subCategory = $('.' + subCategoryClassName, category);

                // コンテンツ
                var contentsCount = 1;
                xmlSubCategory.find('contents').each(function() {
                    var xmlContents       = $(this);
                    var contentsClassName = "contents" + contentsCount;

                    subCategory.append('<h6 class="' + contentsClassName + '"></h6>');
                    var contents = $('.' + contentsClassName, subCategory);
                    contents.append('<a href="' + xmlContents.attr('path') + '">' + xmlContents.find('description').text() + '</a>');

                    // コンテンツのカウントアップ
                    contentsCount++;
                });

                // サブカテゴリーのカウントアップ
                subCategoryCount++;
            });

            // カテゴリーのカウントアップ
            categoryCount++;
        });

        // 関連動画ボタンのイベント付与
        exlinkBtnObj.click(function(){
            baseOverLayObj.show();
            OverLayWindowObj.show();
        });

        // 閉じるボタンのイベント付与
        windowCloseBtnObj.click(function(){
            baseOverLayObj.hide();
            OverLayWindowObj.hide();
        });

        // ベースオーバーレイのイベント付与
        baseOverLayObj.click(function(){
            baseOverLayObj.hide();
            OverLayWindowObj.hide();
        });

        // 動画再生完了時
        videoObj.bind("ended", function() {
            nextChapterTypeA();
        });
    }

    /**
     * 次のチャプターの再生を開始します（タイプA）
     */
    function nextChapterTypeA() {
        var targetObj = $('#playing').next();
        var list = $('li', chapterListObj);
        var index = list.index(targetObj);

        // 次の動画が存在するか確認
        if (targetObj.attr('videourl') === undefined) return;

        // 画質切り替えボタン
        if (targetObj.attr('quality') == 1) {
            qualityHighBtnObj.show();
            qualityLowBtnObj.show();
        } else {
            qualityHighBtnObj.hide();
            qualityLowBtnObj.hide();
        }

        // 動画の切り替え
        videoObj.attr('src', targetObj.attr('videourl'));

        // 動画読み込み
        videoHtml.load();

        // 次のページの場合、ページ遷移
        if ((index - 1) % options.pageLimit == 0) {
            if (pageInitial < ($('li', chapterListObj).size() - 2) / options.pageLimit - 1) {
                pageInitial++;
                chapterListPaging();
            }
        }

        // 再生中クラスの設定
        list.removeAttr('id').not('#prevBtn, #nextBtn');
        $('li:first', chapterListObj).attr('id', 'prevBtn');
        $('li:last', chapterListObj).attr('id', 'nextBtn');
        targetObj.attr('id', 'playing');

        // 時間経過関連のイベント削除
        videoObj.unbind('timeupdate');

        // 字幕欄の初期化
        subtitleObj.html('');

        // 字幕の設定
        setSubtitle(targetObj.attr('caption'));

        // 時間経過毎のイベント
        videoObj.bind("timeupdate", function() {
            // シークバー操作・時間表示
            controlSeekBar();

            // バッファーの設定
            setbuffer();
        });

        // 動画の再生開始
        videoObj.bind("canplay", function() {
            play();
        });
    }

    /**
     * チャプターリストの設定(タイプA)
     */
    function setChapterListTypeA() {
        // チャプターリスト出力
        var chapterCount = 1;
        xmlContent.find('movie chapter').each(function(){
            // 時間計算
            var duration = "";
            if(typeof $(this).attr('duration') !== 'undefined') {
                duration = '<span class="runningTime">' + timeConversion($(this).attr('duration')) + '</span>';
            }

            // HTMLを出力
            var quality = 0;
            if ($(this).attr('quality') !== undefined) {
                quality = $(this).attr('quality');
            }
            nextBtnObj.before('<li videourl="' + $(this).attr('videourl') + '" caption="' + $(this).attr('caption') +'" class="chapter" quality="' + quality +'"><a href="#">' + $(this).attr('name') + duration + '</a></li>');

            chapterCount++;
        });

        // 最初の動画にidを追加
        prevBtnObj.next().attr('id', 'playing');

        // チャプタークリックのイベントを付与します
        var list = $('li', chapterListObj);
        list.not('#prevBtn, #nextBtn').click(function () {
            // 動画の切り替え
            videoObj.attr('src', $(this).attr('videourl'));

            // 動画読み込み
            videoHtml.load();

            // 再生中クラスの設定
            list.removeAttr('id').not('#prevBtn, #nextBtn');
            $('li:first', chapterListObj).attr('id', 'prevBtn');
            $('li:last', chapterListObj).attr('id', 'nextBtn');
            $(this).attr('id', 'playing');

            // 時間経過関連のイベント削除
            videoObj.unbind('timeupdate');

            // 字幕欄の初期化
            subtitleObj.html('');

            // 字幕の設定
            setSubtitle($(this).attr('caption'));

            // 画質切り替えボタン
            if ($(this).attr('quality') == 1) {
                qualityHighBtnObj.show();
                qualityLowBtnObj.show();
            } else {
                qualityHighBtnObj.hide();
                qualityLowBtnObj.hide();
            }

            // 時間経過毎のイベント
            videoObj.bind("timeupdate", function() {
                // シークバー操作・時間表示
                controlSeekBar();

                // バッファーの設定
                setbuffer();
            });

            // 動画の再生開始
            videoObj.bind("canplay", function() {
                play();
                tabBtnObj.hide();
            });
        });

        // チャプターリストのページボタンの設定
        setChapterPageBtn();
    }

    /**
     * チャプターリストの設定(タイプB)
     */
    function setChapterListTypeB() {
        var list = $('li', chapterListObj);

        // チャプターリスト出力
        var chapterCount = 1;
        xmlContent.find('movie chapter').each(function(){
            // 必要な値の取得・設定
            var duration = "";
            var time   = $(this).attr('time');
            var end    = $(this).next().attr('time');
            var child  = $(this).children('chapter').attr('time');
            var parent = $(this).parent().next().attr('time');

            // 終了時間
            if(typeof end === 'undefined' && typeof child === 'undefined' && typeof parent === 'undefined') {
                end = true;
            } else if(typeof end === 'undefined' && typeof child === 'undefined' && typeof parent !== 'undefined') {
                end = Math.round(parent);
            } else if(typeof end !== 'undefined' && typeof child === 'undefined') {
                end = Math.round(end);
            } else if(typeof child !== 'undefined') {
                end = Math.round(child);
            }

            if(typeof time !== 'undefined') {
                duration = '<span class="runningTime">' + timeConversion(time) + '</span>';
            }

            // HTMLを出力
            var className = 'chapter' + chapterCount;
            nextBtnObj.before('<li class="' + className + '" time="' + time +'"><a href="#">' + $(this).attr('name') + duration + '</a></li>');

            // 指定時間の動作
            videoObj.bind("timeupdate", function() {
                if (end != '') {
                    end = getVideoTime();
                }
                if (videoHtml.currentTime >= (time) && videoHtml.currentTime <= end) {
                    var targetObj = $('#playing').next();
                    var index = list.index(targetObj);

                    // 選択中の切り替え
                    list.removeAttr('id').not('#prevBtn, #nextBtn');
                    $('li:first', chapterListObj).attr('id', 'prevBtn');
                    $('li:last', chapterListObj).attr('id', 'nextBtn');
                    $('.' + className).attr('id', 'playing');

                    // 次のページの場合、ページ遷移
                    if (videoHtml.currentTime <= parseInt(time) + 1) {
                        if ((index - 1) % options.pageLimit == 0) {
                            if (pageInitial < ($('li', chapterListObj).size() - 2) / options.pageLimit - 1) {
                                pageInitial = parseInt((index - 1) / options.pageLimit);
                                chapterListPaging();
                            }
                        }
                    }
                }
            });

            chapterCount++;
        });

        videoObj.bind("timeupdate", function() {
            if (ffFlag || rewFlag) {
                setChapterPage();
            }
        });

        // チャプターが一つもない場合
        if (chapterCount == 1) {
            commentObj2.parent().addClass('typeB2');
            chapterListObj.hide();
        }

        // 最初の動画にidを追加
        prevBtnObj.next().attr('id', 'playing');

        // チャプタークリックのイベントを付与します
        var list = $('li', chapterListObj);
        list.not('#prevBtn, #nextBtn').click(function () {
            // 再生中クラスの設定
            list.removeAttr('id').not('#prevBtn, #nextBtn');
            $('li:first', chapterListObj).attr('id', 'prevBtn');
            $('li:last', chapterListObj).attr('id', 'nextBtn');
            $(this).attr('id', 'playing');

            // 再生時間の指定
            videoHtml.currentTime = $(this).attr('time');

            // 動画の再生開始
            play();
            tabBtnObj.hide();
        });

        // チャプターリストのページボタンの設定
        setChapterPageBtn();
    }

    /**
     * 現在のチャプターのページを設定します
     */
    function setChapterPage() {
        var idx = $('li', chapterListObj).index($('#playing'));
        pageInitial = parseInt((idx - 1) / options.pageLimit);
        chapterListPaging();
        rewFlag = false;
        ffFlag = false;
    }

    /**
     * チャプターリストのページボタンの設定
     */
    function setChapterPageBtn () {
        // ページ数
        chapterListObj.prepend('<input type="hidden" id="chapterPage" value="" />');

        // △ボタン
        prevBtnObj.click(function(){
            if (pageInitial > 0) {
                pageInitial--;
                chapterListPaging();
            }
        });

        // ▽ボタン
        nextBtnObj.click(function(){
            if (pageInitial < ($('li', chapterListObj).size() - 2) / options.pageLimit - 1) {
                pageInitial++;
                chapterListPaging();
            }
        });

        // ページング実施
        chapterListPaging();
    }

    /**
     * チャプターリストのページング表示
     */
    function chapterListPaging() {
    	if (xmlContent.find('content').attr('type') != typeB && xmlContent.find('content').attr('type') != typeA) {
    		return;
    	}
        // ページ数の設定
        $('#chapterPage').val(pageInitial);

        // 全ての項目の非表示
        $('li', chapterListObj).not('#prevBtn, #nextBtn').hide();

        // 指定ページを制限個数で表示
        $('li:gt(' + pageInitial * options.pageLimit + '):lt(' + options.pageLimit + ')', chapterListObj).show();

        // △ボタンの切り替え
        if (pageInitial == 0) {
            $('img', prevBtnObj).attr('src', arrowUpG);
        } else {
            $('img', prevBtnObj).attr('src', arrowUpN);
        }

        // ▽ボタンの切り替え
        if (xmlContent.find('movie chapter').size() == options.pageLimit) {
            $('img', nextBtnObj).attr('src', arrowDownG);
        } else if (pageInitial == (Math.ceil(xmlContent.find('movie chapter').size() / options.pageLimit)- 1)) {
            $('img', nextBtnObj).attr('src', arrowDownG);
        } else {
            $('img', nextBtnObj).attr('src', arrowDownN);
        }
    }

    /**
     * XMLを基準に指定のパスを返す
     * @param target
     */
    function createPath(target) {
        var path = "";

        // xmlへのパス作成
        var pathArray = options.xmlPath.split('/');
        if (pathArray.length == 1) {
            path = target;
        } else {
            for (i = 0; i < pathArray.length - 1; i++) {
                if (path != "") {
                    path += '/';
                }
                path += pathArray[i];
            }
            path += '/' + target;
        }

        return path;
    }

    /**
     * スライドの設定
     */
    function setSlide() {
        var targetSlide  = 'targetSlide';
        var btnClickFlag = false;

        // ボタンを初期化
        arrowLeftObj.eq(1).hide();
        arrowRightObj.eq(1).hide();

        // 初期スライド
        var posterimg = createPath(xmlContent.find('flip').attr('posterimg'));
        arrowLeftObj.eq(0).before('<img class="slide_1 ' + slideClassName + '" index="0" width="' + rightWith + '" height="' + rightHeight + '" alt="" src="' + posterimg + '" />');

        // 他のスライド出力
        var slideCount = 2;
        var minTime    = 0;
        xmlContent.find('flip image').each(function(){
            // 各種パラメータ
            var path       = createPath($(this).attr('filename'));
            var start      = parseFloat($(this).attr('index'));
            var end        = parseFloat($(this).next().attr('index'));
            var slideClass = '.slide_' + slideCount;

            // スライド出力
            arrowLeftObj.eq(0).before('<img class="slide_' + slideCount + ' ' + slideClassName + '" index="' + start + '" width="' + rightWith + '" height="' + rightHeight + '" alt="" src="' + path + '" style="display: none" />');

            // 各々の時間になった際、スライドを切り替える
            videoObj.bind("timeupdate", function() {
                // ボタンによる変更対策
                if (btnClickFlag === true) return;

                if (isNaN(end)) end = videoHtml.duration;
                if (videoHtml.currentTime >= start && videoHtml.currentTime <= end) {
                    $('.' + slideClassName).hide().removeAttr('id');
                    $(slideClass).show().attr('id', targetSlide);
                }
            });

            // スライドの最小時間を取得
            if(minTime >= parseFloat(start) || minTime == 0) {
                minTime = start;
            }

            // カウントアップ
            slideCount++;
        });

        // スライドの最小時間以前は初期画像を使用する
        videoObj.bind("timeupdate", function() {
            if(videoHtml.currentTime < minTime - 1) {
                $('.' + slideClassName).hide().removeAttr('id');
                $('.' + slideClassName + ':first').show().attr('id', targetSlide);
            }
        });

        // 左スライド
        arrowLeftObj.click(function(){
            btnClickFlag = true;

            // 選択要素のインデックス取得
            var index = $('.' + slideClassName).index($('#' + targetSlide));

            // インデックスが0以下の場合は処理終了
            if (index <= 0) return;

            // スライドの切り替え
            $('.' + slideClassName).hide().removeAttr('id');
            $('.' + slideClassName).eq(index - 1).show().attr('id', targetSlide);

            // 再生時間設定
            videoHtml.currentTime = $('#' + targetSlide).attr('index');

            // 再生開始
            play();

            btnClickFlag = false;
        });

        // 右スライド
        arrowRightObj.click(function(){
            btnClickFlag = true;

            // 選択要素のインデックス取得
            var index = $('.' + slideClassName).index($('#' + targetSlide));

            // インデックスがスライド数以上の場合は処理終了
            if (index >= $('.' + slideClassName).length - 1) return;

            // スライドの切り替え
            $('.' + slideClassName).hide().removeAttr('id');
            $('.' + slideClassName).eq(index + 1).show().attr('id', targetSlide);

            // 再生時間設定
            videoHtml.currentTime = $('#' + targetSlide).attr('index');

            // 再生開始
            play();

            btnClickFlag = false;
        });
    }

    /**
     * 入れ替えの設定
     */
    function setChangeWindow() {
        changeWindowObj.click(function(){
            // ビデオとスライドの入れ替え
            changeVideoAndSlide();
        });
    }

    /**
     * ビデオとスライドの入れ替え
     */
    function changeVideoAndSlide() {
        var time  = getCurrentVideoTime();
        if (changeWindowFlag == 0) {
            // ビデオの移動
            // iOS5の場合
            if (isIos5()) {
                var clone = videoObj.clone(true);
                arrowRightObj.eq(0).after(clone);
                videoObj.remove();
                videoObj  = $(videoName);
                videoHtml = videoObj.get(0);
                videoHtml.load();
                // 再開可能になった場合
                videoObj.bind("canplay", function() {
                    stop();
                    setTimeout(function(){
                        videoHtml.currentTime = time;
                        play();
                    }, 1000);
                });
            } else {
                arrowRightObj.eq(0).after(videoObj);
            }
            videoObj.attr('width', rightWith).attr('height', rightHeight);

            // タブレット用再生ボタン
            arrowRightObj.eq(0).after(tabBtnObj);
            tabBtnObj.hide();

            // 字幕の移動
//            videoObj.after(subtitleWrap);

            // スライドショーの移動
            arrowRightObj.eq(1).after($('.' + slideClassName));
            $('.' + slideClassName).attr('width', leftWith).attr('height', leftHeight);

            // フラグの切り替え
            changeWindowFlag = 1;

            // ボタンの切り替え
            arrowLeftObj.eq(0).hide();
            arrowRightObj.eq(0).hide();
            arrowLeftObj.eq(1).show();
            arrowRightObj.eq(1).show();

        } else if(changeWindowFlag == 1) {
            // ビデオの移動
            // iOS5の場合
            if (isIos5()) {
                var clone = videoObj.clone(true);
                arrowRightObj.eq(1).after(clone);
                videoObj.remove();
                videoObj  = $(videoName);
                videoHtml = videoObj.get(0);
                videoHtml.load();
                // 再開可能になった場合
                videoObj.bind("canplay", function() {
                    stop();
                    setTimeout(function(){
                        play();
                        videoHtml.currentTime = time;
                        tabBtnObj.hide();
                        }, 1000);
                });
            } else {
                arrowRightObj.eq(1).after(videoObj);
            }
            videoObj.attr('width', xmlContent.find('movie').attr('width')).attr('height', xmlContent.find('movie').attr('height'));

            // タブレット用再生ボタン
            arrowRightObj.eq(1).after(tabBtnObj);
            tabBtnObj.hide();

            // 字幕の移動
//            playerObj.after(subtitleWrap);

            // スライドショーの移動
            arrowRightObj.eq(0).after($('.' + slideClassName));
            $('.' + slideClassName).attr('width', rightWith).attr('height', rightHeight);

            // フラグの切り替え
            changeWindowFlag = 0;

            // ボタンの切り替え
            arrowLeftObj.eq(0).show();
            arrowRightObj.eq(0).show();
            arrowLeftObj.eq(1).hide();
            arrowRightObj.eq(1).hide();
        }

        // 再生開始
        play();
    }

    /**
     * タブレット用の設定を行います
     */
    function settingTablet() {
        // calssの追加
        if(isIpad) {
            $('#container').addClass('ipad');
        } else {
            $('#container').addClass('tab');
        }

        // 不要要素の削除
        loadingObj.remove();
        loadingCenterObj.remove();

        // 動画上の再生ボタンにイベントを追加
        tabStartBtnObj.click(function(){
            play();
        });

        // 一時停止ボタンにイベント付与
        pauseBtnObj.click(function(){
            tabBtnObj.show();
        });

        // 停止ボタンにイベント付与
        stopBtnObj.click(function(){
            tabBtnObj.show();
        });

    }

    /**
     * ムービーの長さを取得
     */
    function getVideoTime() {
        return Math.round(videoHtml.duration);
    }

    /**
     * ムービーの現在の再生時間を取得
     */
    function getCurrentVideoTime() {
        return Math.round(videoHtml.currentTime);
    }

    /**
     * 指定秒より00:00:00 or 00:00の形を返す
     */
    function timeConversion(time) {
        var conv = ('0' + getConvertMinute(time)).slice(-2)
                    + ':' + ('0' + getConvertSecond(time)).slice(-2);

        if (getConvertHour(time) != 0) {
            conv = getConvertHour(time) + ':' + conv;
        }

        return conv;
    }

    /**
     * 指定時間（秒）から時間を取得する
     */
    function getConvertHour(time) {
        hour = (time / 3600);
        if(hour >= 1) return parseInt(hour);
        return 0;
    }

    /**
     * 指定時間（秒）から分を取得する
     */
    function getConvertMinute(time) {
        min = (time / 60);
        if(min >= 1) return parseInt(min);
        return 0;
    }

    /**
     * 指定時間（秒）から時間・分を抜いた秒を取得する
     */
    function getConvertSecond(time) {
        sec = (time % 3600);
        sec = (sec % 60);
        if(sec >= 1) return parseInt(sec);
        return 0;
    }

    /**
     * タブレットかどうかを判別します
     * (AndroidもしくはiPad)
     */
    function isTablet() {
        if (isAndroid() || isIpad()) {
            return true;
        }
        return false;
    }

    function isAndroid() {
        if (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') == -1) {
            return true;
        }
        return false;
    }

    /**
     * iPadかどうかを判別します
     */
    function isIpad() {
        if (navigator.userAgent.indexOf('iPad') > 0) {
            return true;
        }
        return false;
    }

    /**
     * iOS5かどうかを判別します
     */
    function isIos5() {
        if (navigator.userAgent.indexOf('OS 5') > 0) {
            return true;
        }
        return false;
    }
})(jQuery);
