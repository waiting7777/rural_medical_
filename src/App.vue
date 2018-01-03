<template>
  <div id="app">
    <Indicator color="#EF4326" />
    <Cover :src="bg" :srcWeb="bg_web">
      <div id="cover-contain">
        <h1>相同健保費，<span class="hidden-md hidden-lg"><br/></span>看病命運大不同</h1>
        <div class="sub-title">地圖看台灣醫療資源</div>
        <div class="title-button"><i class="fa fa-angle-down"></i></div>
      </div>
      <div id="cover-icon">
        <img src="./assets/pill.png">
      </div>
    </Cover>
    <ContentContainer>
      <div id="cover-text">
        <p>台灣醫療資源分配不均問題嚴重，但是從政府官方數據卻無法看出急迫性。根據<a target="_blank" href="https://dep.mohw.gov.tw/DOS/np-3050-113.html">衛福部醫療服務量統計資料</a>，嘉義市醫療資源最充足，其次是花蓮縣和台北市。</p>
        <p><br/></p>
        <p>花蓮縣贏過都會區讓人詫異，《聯合報》團隊諮詢專家、偏鄉醫生，撈出大量官方數據並且比對地圖，發現花蓮部分鄉鎮醫療資源嚴重不均，居民要找到醫生、藥局，難如登天。更多縣市期待臨終最後一哩路能好好走，安寧資源卻像沙漠般匱乏。</p>
        <p><br/></p>
        <p>偏鄉老年人口多，他們繳一樣的健保費卻無法享有相同的醫療資源。要滿足偏鄉醫療需求，需要的或許不是大醫院，而是能就近領藥、生病時有地方求助的安心所在。</p>
      </div>
      <br/>
      <Share href="https://udn.com/upf/newmedia/2018_data/rural_medical/index.html" />
      <br/>
    </ContentContainer>
    <Section id="section-1" :src="section1" :srcWeb="section1_web" text="政府說醫療資源充足，你相信嗎？"/>
    <div id="map-contain">
      <div id="svg-contain" :class="{zoomIn: mapScale}">
        <div id="map" :style="{transform: 'translate(' + mapTranslate.x + ', ' + mapTranslate.y + ')'}">
          <svg width="375" height="667">
            <image href="./static/taiwan.png" x="28" y="-3" width="375" height="667"></image>
            <g>
              <g v-for="town in topoTown">
                <path :d="town.d" :id="town.location" class="town"></path>
              </g>
            </g>
            <g>
              <g v-for="country in topoCountry">
                <path :d="country.d" :id="country.location" class="country"></path>
              </g>
            </g>
            <g>
              <g v-for="country in hospitals">
                <circle v-for="hospital in country" :cx="hospital.cx" :cy="hospital.cy" class="point" :class="[{show: circleShow}, hospital.country]" :style="{fillOpacity: hospital.fillOpacity}"></circle>
              </g>
            </g>
            <g>
              <g v-for="maptext in mapTextData" :style="{opacity: maptext.opacity}">
                <text v-for="text in maptext.data" :x="text.x" :y="text.y" class="svg-text">{{text.text}}</text>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
    <div class="textbox" id="r-1">
      <h2 class="hidden-xs hidden-sm">破解數字迷思 從地圖看偏鄉就醫的苦</h2>
      <br/>
      探討醫療資源分布的區域差異時，不能只看病床數、醫事人員數，這樣的計算方式是假設區域內的人口和醫療機構是平均分布，但事實上醫療機構根本分布不均。《聯合報》團隊透過數據清洗，並且結合地圖畫出全國醫學中心及區域醫院位置，圖中可清楚發現，<b>大型醫療院所多集中在北部和西部，東部較少，顯示全國醫療資源分布落差，進一步觀察，每一個縣市也有醫療資源分配不均情況</b>。
    </div>
    <div class="space"></div>
    <div class="textbox" id="r-2">
      比如被衛福部稱為醫療資源豐沛的花蓮縣，主因人口較少，平均下來每萬人病床數可高達132床、醫事人員數130人，在全國名列前茅。但透過地圖就能清楚看到官方數據陷阱，花蓮縣地廣、醫院數少，且<b>三家大型醫院都集中花蓮市，花蓮中南區偏鄉民眾就醫極度不便</b>。
    </div>
    <div class="space"></div>
    <div class="textbox" id="r-3">
      以花蓮熱門景點六十石山為例，其位在花蓮縣最南邊的富里鄉，因為偏鄉醫療資源不足，當地民眾若要看慢性病、做檢查，只能跑大醫院。我們利用Google map路線規劃功能試算，當地到縣內三家大型醫院的行車時間，最短車程得花上2小時17分，才能抵達花蓮市區的門諾醫院。<br/><br/>偏鄉多老人家，普遍沒有交通工具，搭計程車到大醫院來回車資至少上千元；若搭公車，等車、換車得花上一整天。對偏鄉老人來說，就醫可謂是一條漫漫長路。
    </div>
    <div class="space"></div>
    <div class="textbox" id="r-4">
      後山醫療不均問題，花東縣市居民點滴在心頭。台東金城武樹是許多遊客造訪的熱門景點，位於好山好水的池上鄉，但這裡的長輩生活可能不像風景如此美好，翻山越嶺看病是他們的日常。<br/><br/>台東縣只有一家區域醫院馬偕台東分院，位於台東市，池上鄉居民若要就醫，最短車程得花上1小時11分。台東縣衛生局指出，台東每萬人平均病床數雖只略低於全國平均值，但若分別看台東縣內四個次醫療區（數個鄰近鄉鎮為一次醫療區），台東區只有42床，關山、成功區都不到10床，大武區更慘，掛鴨蛋。
    </div>
    <div class="space"></div>
    <div class="textbox" id="r-5">
      根據衛福部數據，屏東縣的醫療資源與全國平均相近。但把數據放到地圖上便一目瞭然，屏東縣醫療資源多集中在屏東市，南北狹長的地理位置，南端的恆春半島包含恆春鎮、車城、滿州、牡丹鄉，居民就醫極度不便。<br/><br/>以恆春鎮的墾丁大街為例，這裡的居民要到大醫院看病，最短得花上1小時26分鐘車程。
    </div>
    <div class="space"></div>
    <div class="textbox" id="r-6">
      反觀台北市，醫療資源豐沛，市區內有20家大型醫院，就醫可近性高。若以一位大安區居民為例，最短只需要6分鐘，便可抵達鄰近的台大醫院，與偏鄉居民就醫時間形成極大落差。
    </div>
    <div class="space"></div>
    <div class="space" id="r-7"></div>
    <div class="textbox" id="r-8">
      <h2 class="hidden-xs hidden-sm">52鄉鎮沒健保藥局 37萬人受影響</h2>
      <br/>
      食藥署2017年9月曾公布，「全國健保特約藥局數量已達到6000家以上，藥局密度甚至高於我們日常生活常光顧的便利商店。」但食藥署沒說的是，即使藥局密度如此高，<b>全國仍有52個鄉鎮市區連一家健保藥局都沒有，估計36.8萬人受影響</b>。
      <br/><br/>
      慢性病患者可持「慢性病連續處方箋」到附近的健保特約藥局領藥，就可免跑醫院排隊掛號、批價，但沒有健保藥局的地區多位於人口密度低的偏鄉及山區，這裡的居民必須跨區領藥，<b>他們雖然繳納相同的健保費，卻無法享受同等的醫療資源</b>。
    </div>
    <div class="space"></div>
    <div class="textbox" id="r-9">
      <h2 class="hidden-xs hidden-sm">15個超高齡鄉鎮 領藥難上加難</h2>
      <br/>
      <b>進一步分析這52個沒有健保藥局的鄉鎮市區，其中有15個是「超高齡鄉鎮」</b>。而老年人口中，高達八成至少罹患一種慢性疾病，他們必須定期領藥，是最需要健保藥局的族群。
      <br/><br/>
      包括新北市坪林、平溪、貢寮，新竹縣橫山、峨眉，苗栗縣三灣、獅潭，南投縣鹿谷、中寮，台南市南化、龍崎，高雄市田寮，花蓮縣豐濱、富里，台東縣東河都是零健保藥局。這裡的老人家怎麼辦？
    </div>
    <div class="space"></div>
    <div class="textbox" id="r-10">
      <h2 class="hidden-xs hidden-sm">141鄉鎮缺緊急醫療資源 轉診像賭命</h2>
      <br/>
      2017年11月底，<a target="_blank" href="https://udn.com/news/plus/9734/2862448">苗栗縣公館一名張姓村長的兒子急病</a>，輾轉苗栗、新竹、台北醫院急救，5天後回天乏術，此事件凸顯苗栗緊急醫療資源不足問題。根據衛福部公布「緊急醫療資源不足」地區，轉換成鄉鎮市區於地圖上表示，<b>全國有141個鄉鎮市區缺乏緊急醫療資源，居民一旦發生突發中風、心肌梗塞、重大外傷等急重症，只能轉送其他地區，可能因此錯失黃金搶救時間</b>，有些人甚至途中就不幸死亡，轉診幾乎變成在賭命。
    </div>
    <div class="space"></div>
  </div>
</template>

<script>

import Cover from '@/components/CoverFixedBg'
import Section from '@/components/Section'
import { Indicator, ContentContainer, Quote, Share, Editor, Relate, FBComment, Foot, Logo } from 'udn-newmedia-vue-components'

import bg from '@/assets/bg.jpg'
import bg_web from '@/assets/bg_web.png'

import section1 from '@/assets/section1.jpg'
import section2 from '@/assets/section2.jpg'
import section3 from '@/assets/section3.jpg'
import section1_web from '@/assets/section1_web.jpg'
import section2_web from '@/assets/section2_web.jpg'
import section3_web from '@/assets/section3_web.jpg'

export default {
  name: 'app',
  data: function(){
    return {
      main: [
        {id: 0, location: '新北市', population: 3979208, old: 465909, hospital: 10, beds: 44, employee: 68, x: '-108px', y: '164px', cancer: 6750, noresource: 11, dessert: 37.9},
        {id: 1, location: '臺北市', population: 2695704, old: 419130, hospital: 20, beds: 93, employee: 168, x: '-108px', y: '174px', cancer: 5219, noresource: 0, dessert: 0},
        {id: 2, location: '桃園市', population: 2147763, old: 219425, hospital: 9, beds: 70, employee: 96, x: '-64px', y: '147px', cancer: 3231, noresource: 4, dessert: 30.7},
        {id: 3, location: '臺中市', population: 2767239, old: 301994, hospital: 16, beds: 76, employee: 115, x: '-5px', y: '53px', cancer: 4877, noresource: 13, dessert: 44.8},
        {id: 4, location: '臺南市', population: 1886033, old: 259701, hospital: 10, beds: 68, employee: 108, x: '65px', y: '-109px', cancer: 4352, noresource: 24, dessert: 64.8},
        {id: 5, location: '高雄市', population: 2779371, old: 373604, hospital: 10, beds: 78, employee: 120, x: '43px', y: '-161px', cancer: 6112, noresource: 26, dessert: 68.4},
        {id: 6, location: '宜蘭縣', population: 457538, old: 67798, hospital: 3, beds: 85, employee: 98, x: '-115px', y: '115px', cancer: 1061, noresource: 4, dessert: 33.3},
        {id: 7, location: '新竹縣', population: 547481, old: 64040, hospital: 1, beds: 44, employee: 51, x: '-45px', y: '122px', cancer: 836, noresource: 9, dessert: 69.2},
        {id: 8, location: '苗栗縣', population: 559189, old: 82771, hospital: 3, beds: 59, employee: 64, x: '-17px', y: '94px', cancer: 1288, noresource: 12, dessert: 66.6},
        {id: 9, location: '彰化縣', population: 1287146, old: 182962, hospital: 5, beds: 59, employee: 90, x: '49px', y: '5px', cancer: 2904, noresource: 7, dessert: 26.9},
        {id: 10, location: '南投縣', population: 505163, old: 80135, hospital: 1, beds: 65, employee: 73, x: '-17px', y: '-14px', cancer: 1215, noresource: 2, dessert: 15.3},
        {id: 11, location: '雲林縣', population: 694873, old: 118764, hospital: 5, beds: 56, employee: 73, x: '56px', y: '-23px', cancer: 2026, noresource: 8, dessert: 40},
        {id: 12, location: '嘉義縣', population: 515320, old: 92234, hospital: 1, beds: 66, employee: 83, x: '45px', y: '-54px', cancer: 1666, noresource: 1, dessert: 5.5},
        {id: 13, location: '屏東縣', population: 835792, old: 127016, hospital: 7, beds: 68, employee: 86, x: '26px', y: '-222px', cancer: 2148, noresource: 8, dessert: 24.2},
        {id: 14, location: '臺東縣', population: 220802, old: 33060, hospital: 1, beds: 68, employee: 89, x: '-29px', y: '-172px', cancer: 672, noresource: 11, dessert: 68.7},
        {id: 15, location: '花蓮縣', population: 330911, old: 46329, hospital: 3, beds: 132, employee: 130, x: '-80px', y: '-25px', cancer: 800, noresource: 6, dessert: 50},
        {id: 16, location: '澎湖縣', population: 103263, old: 15579, hospital: 0, beds: 53, employee: 64, x: '144px', y: '-32px', cancer: 250, noresource: 5, dessert: 83.3},
        {id: 17, location: '基隆市', population: 372100, old: 51949, hospital: 3, beds: 78, employee: 91, x: '-121px', y: '185px', cancer: 750, noresource: 5, dessert: 71.4},
        {id: 18, location: '新竹市', population: 437337, old: 48141, hospital: 2, beds: 64, employee: 115, x: '-18px', y: '128px', cancer: 738, noresource: 1, dessert: 33.3},
        {id: 19, location: '嘉義市', population: 269874, old: 36268, hospital: 5, beds: 146, employee: 198, x: '59px', y: '-59px', cancer: 601, noresource: 0, dessert: 0},
        {id: 20, location: '金門縣', population: 135114, old: 15769, hospital: 0, beds: 28, employee: 29, x: '116px', y: '132px', cancer: 221, noresource: 5, dessert: 83.3},
        {id: 21, location: '連江縣', population: 12595, old: 1287, hospital: 0, beds: 41, employee: 62, x: '116px', y: '132px', cancer: 13, noresource: 4, dessert: 100}
      ],
      mapTextData: {
        "map1": {
          data: [
            {x: 306.602, y: 296.259, text: '門諾醫院'},
            {x: 263.693, y: 410.194, text: '六十石山'},
            {x: 277, y: 336, text: '2小時21分'},
            {x: 272, y: 345, text: '106公里'}
          ],
          opacity: 0
        },
        "map2": {
          data: [
            {x: 240.503, y: 479.663, text: '馬偕醫院'},
            {x: 249.162, y: 428.486, text: '金城武樹'},
            {x: 237, y: 447, text: '1小時11分'},
            {x: 232, y: 456, text: '52公里'}
          ],
          opacity: 0
        },
        "map3": {
          data: [
            {x: 146.871, y: 521.815, text: '輔英科大附設醫院'},
            {x: 193.827, y: 598.284, text: '墾丁大街'},
            {x: 215, y: 547, text: '1小時31分'},
            {x: 210, y: 556, text: '75公里'}
          ],
          opacity: 0
        },
        "map4": {
          data: [
            {x: 291.981, y: 138.723, text: '台大醫院'},
            {x: 320.330, y: 139.039, text: '大安森林公園'},
            {x: 304, y: 124, text: '6分'},
            {x: 314, y: 134, text: '2.3公里'}
          ],
          opacity: 0
        }
      },
      bg: bg,
      bg_web: bg_web,
      section1: section1,
      section2: section2,
      section3: section3,
      section1_web: section1_web,
      section2_web: section2_web,
      section3_web: section3_web,
      topoTown: null,
      topoCountry: null,
      hospitals: null,
      mapTranslate: {
        x: '0px',
        y: '0px'
      },
      circleShow: false,
      mapScale: false,
    }
  },
  mounted: function(){

    var that = this

    var w = 375
    var h = 667

    var prj = d3.geo.mercator().center([120.971864, 23.400998])
                .scale(7800).translate([w/2 + 30, h/2 + 50])

    var path = d3.geo.path().projection(prj)

    d3.json('./static/country.topojson', function(data){
      var topo = topojson.feature(data, data.objects.map)
      var temp = []
      for(var i in topo.features){
        temp.push({
          d: path(topo.features[i]),
          location: topo.features[i].properties.TOWNNAME
        })
      }
      that.topoCountry = temp
    })

    d3.json('./static/town.topojson', function(data){

      var topo = topojson.feature(data, data.objects.map)
      var temp = []
      for(var i in topo.features){
        temp.push({
          d: path(topo.features[i]),
          location: topo.features[i].properties.TOWNNAME
        })
      }
      that.topoTown = temp
    })

    d3.csv('./static/hospital.csv', function(d){
      var temp = {}
      for(var i in d){
        if(temp[d[i].country] == null){
          temp[d[i].country] = []
        }
        temp[d[i].country].push({
          location: d[i].location,
          name: d[i].name,
          country: d[i].country,
          cx: prj([d[i].lat, d[i].lon])[0],
          cy: prj([d[i].lat, d[i].lon])[1],
          fillOpacity: 0.8
        })
      }
      console.log(temp)
      that.hospitals = temp

    })

    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll: function(){
      var currentH = window.pageYOffset + window.innerHeight

      if(currentH < $('#map-contain').offset().top){
        this.circleShow = false
      }

      if(currentH >= $('#map-contain').offset().top + window.innerHeight / 2 && currentH < $('#r-2').offset().top){
        console.log(5)
        this.mapTranslate.x = '0px'
        this.mapTranslate.y = '0px'
        this.mapScale = false
        this.circleShow = true
        for(var i in this.hospitals){
          for(var j in this.hospitals[i]){
            this.hospitals[i][j].fillOpacity = 0.8
          }
        }
      }

      if(currentH >= $('#r-2').offset().top && currentH < $('#r-3').offset().top){
        this.mapTranslate.x = '-110px'
        this.mapTranslate.y = '-15px'
        this.mapScale = true
        for(var i in this.hospitals){
          if(i == '花蓮縣'){
            continue
          }
          for(var j in this.hospitals[i]){
            this.hospitals[i][j].fillOpacity = 0
          }
        }
      }

      if(currentH >= $('#r-3').offset().top && currentH < $('#r-4').offset().top){
        this.mapTranslate.x = '-110px'
        this.mapTranslate.y = '-15px'
        this.mapScale = true
        this.mapTextData['map1'].opacity = 1
      }
    }
  },
  components: {
    Indicator, Cover, ContentContainer, Section, Quote, Share, Editor, Relate, FBComment, Foot, Logo
  }
}
</script>

<style>

html, body, #app{
  height: 100%;
}

svg{
  width: 100%;
}

#cover #cover-contain{
  position: absolute;
  left: 20px;
  top: 38%;
  right: 20px;
  text-shadow: none;
}

#cover h1{
  color: #010101;
  text-shadow: none;
}

#cover-text{
  color: #4D4D4D;
  font-size: 18px;
  line-height: 32px;
}

#cover-icon{
  width: 140px;
  position: absolute;
  right: 20px;
  top: 10%;
}

.title-button{
  font-size: 50px;
  width: 50px;
  height: 50px;
  margin: auto;
}

#cover-text{
  color: #4D4D4D;
  font-size: 18px;
  line-height: 32px;
}

.point{
  r: 0;
  transition: all 0.7s ease;
  stroke-width: 0.5;
  fill: #EF4326;
  /* fill-opacity: 0.8; */
}

.point.show{
  r: 2;
}

.svg-text{
  font-size: 6px;
  text-anchor: end;
  transform: translate(-6px, 2px);
  transition: all 0.7s ease;
}

.town{
  fill: #FFFFFF;
  fill-opacity: 0;
  stroke: #B5B5B6;
  stroke-opacity: 0;
  stroke-width: 0.25;
  transition: all 0.7s ease;
}

.country{
  fill: #FFFFFF;
  fill-opacity: 0;
  stroke: #B5B5B6;
  stop-opacity: 1;
  stroke-width: 0.5;
  transition: all 0.7s ease;
}

#map-contain{
  overflow: hidden;
  position: relative;
  height: 100%;
}

#svg-contain{
  overflow: hidden;
  position: relative;
  width: 375px;
  height: 667px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;
  transition: all 0.7s ease;
}

#map{
  transition: all 0.7s ease;
}

.zoomIn{
  transform: scale(2.5);
}

.space{
  height: 100%;
}

.textbox{
  padding: 30px 20px;
  color: #4D4D4D;
  font-size: 18px;
  box-shadow: -2.8px 1.1px 7px 0 rgba(0, 0, 0, 0.1);
  background-color: #FFFFFF;
}

</style>
