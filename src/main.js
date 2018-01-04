// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import Utils from 'udn-newmedia-utils'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

$(document).ready(function(){

  var path, scroll_now, sec1, sec2, sec3, chart1, chart_flag = false
  var w = $(window).width()
	var h = $(window).height()

  if(w > 1024){
    var draw = bodymovin.loadAnimation({
      container: document.getElementById('draw-1'),
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: './static/web/data.json'
    })
  }
  else{
    var draw = bodymovin.loadAnimation({
      container: document.getElementById('draw-1'),
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: './static/data.json'
    })
  }


  $('.title-button').click(function(){
    $('html, body').animate({scrollTop : window.innerHeight}, 1000, function(){console.log(123)});
    ga("send", {
      "hitType": "event",
      "eventCategory": "scroll down",
      "eventAction": "click",
      "eventLabel": "[" + Utils.detectPlatform() + "] [" + document.querySelector('title').innerHTML + "] [scroll down] "
    });
  })

  $('a').click(function(){
    console.log('click')
    fbq('track', 'ViewContent');
    ga("send", {
      "hitType": "event",
      "eventCategory": "超連結點擊",
      "eventAction": "click",
      "eventLabel": "[" + Utils.detectPlatform() + "] [" + document.querySelector('title').innerHTML + "] [" + $(this).attr('href') + "] [" + $(this).parent().attr('class') + "]"
    });
  })

  $('.hbutton').click(function(){
    var target = $(this).data('target')
      ga("send", {
        "hitType": "event",
        "eventCategory": "hbutton click",
        "eventAction": "click",
        "eventLabel": "[" + Utils.detectPlatform() + "] [" + document.querySelector('title').innerHTML + "] [hbutton click" + target + "]"
      });

    if(target == 1 || target == 2 || target == 3){
      $('html, body').animate({scrollTop : $('#section-' + target).offset().top}, 1000, function(){});
      $("#hbutton-contain").toggleClass("open");
      $("#nav-icon").toggleClass("open");
    }
    console.log($(this).data('target'))
  })

  $(window).on('scroll', function(){

    scroll_now = $(window).scrollTop();
	
			chart1 = $('#draw-1').offset().top
			sec1 = $('#section-1').offset().top
			sec2 = $('#section-2').offset().top
			sec3 = $('#section-3').offset().top
	
			if(scroll_now > chart1 - h && scroll_now < chart1){
				if(!chart_flag){
					draw.play()
					chart_flag = true
				}
			}

			if(scroll_now < sec1 - h/2){
				$('.hbutton').removeClass('hbutton-select')
			}
			else if(scroll_now >= sec1 - h/2 && scroll_now < sec2 - h/2){
				$('.hbutton').removeClass('hbutton-select')
				$('.hbutton[data-target="1"]').addClass('hbutton-select')
			}
			else if(scroll_now >= sec2 - h/2 && scroll_now < sec3 - h/2){
				$('.hbutton').removeClass('hbutton-select')
				$('.hbutton[data-target="2"]').addClass('hbutton-select')
			}
			else{
				$('.hbutton').removeClass('hbutton-select')
				$('.hbutton[data-target="3"]').addClass('hbutton-select')
			}

  })
  
})
