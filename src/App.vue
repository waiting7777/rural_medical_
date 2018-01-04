<template>
  <div id="app">
    <Indicator color="#EF4326" />
    <HeadBar buttonColor="#ACABAB">
      <div class="hbutton" data-target="1">偏鄉就醫有多苦</div>
			<div class="hbutton" data-target="2">你的家鄉安寧嗎</div>
			<div class="hbutton" data-target="3">醫生病人相對論</div>
    </HeadBar>
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
      <ContentContainer id="map-content">
        <h2 class="hidden-md hidden-lg">{{mapcontent}}</h2>
      </ContentContainer>
      <div id="map-say">
        <div><span class="circle"></span>{{mapmark}}</div>
      </div>
      <div id="map-select" :class="{open: mapMenu, show: mapSelectShow}" @click="expand">
        <img src="./assets/search.png">
        <span>{{selectedText}}</span>
      </div>
      <div id="map-menu" :class="{open: mapMenu}">
        <div class="item" @click="menuClick(index)" v-for="(item, index) in main" :key="item.id">{{item.location}}</div>
      </div>
      <div id="map-tooltip" :class="{show: mapTooltipShow}">
        <div class="tooltip-title">{{selectedCountry.location}}</div>
        <div id="tooltip-detail">
          <div :class="{hidden:part2}">
            <div class="detail">人口數<span>{{selectedCountry.population}}人</span></div>
            <div class="detail">老年人口數<span>{{selectedCountry.old}}人</span></div>
            <div class="detail">醫院總數<span>{{selectedCountry.hospital}}家</span></div>
            <div class="detail">每萬人口病床數<span>{{selectedCountry.beds}}床</span></div>
            <div class="detail noborder">每萬人口執業醫事人口數<span>{{selectedCountry.employee}}人</span></div>
          </div>
          <div :class="{hidden:!part2}">
            <div class="detail">老年人口數<span>{{selectedCountry.old}}人</span></div>
            <div class="detail">105年度癌症死亡人口<span>{{selectedCountry.cancer}}人</span></div>
            <div class="detail">多少零安寧資源鄉鎮<span>{{selectedCountry.noresource}}個</span></div>
            <div class="detail noborder">沙漠比率<span class="number">{{selectedCountry.dessert}}%</span></div>
          </div>
        </div>
      </div>
      <div id="map-board" :class="{show: boardShow}">
        <div id="board-title">{{selectedCountry.location}}</div>
        <div :class="{hidden:part2}">
          <div class="board-text">人口數<span>330911人</span></div>
          <div class="board-text">老年人口數<span>48649人</span></div>
          <div class="board-text">每萬人口病床數<span class="number" :style="boardFont">132床</span></div>
          <div class="board-text">每萬人口執業醫事人員數<span class="number" :style="boardFont">130人</span></div>
        </div>
        <div :class="{hidden:!part2}">
          <div class="board-text">老年人口<span>{{selectedCountry.old}}</span></div>
          <div class="board-text">105年度癌症死亡人口<span>{{selectedCountry.cancer}}</span></div>
          <div class="board-text">多少零安寧資源鄉鎮<span>{{selectedCountry.noresource}}</span></div>
          <div class="board-text" id="board-text-s">沙漠比率<span id="dessertNumber" class="number" :style="boardFont">{{selectedCountry.dessert}}%</span></div>
        </div>
      </div>
      <div id="svg-contain" :class="{zoomIn: mapScale}">
        <div id="map" :style="{transform: 'translate(' + mapTranslate.x + ', ' + mapTranslate.y + ')'}">
          <svg width="375" height="667">
            <image href="./static/taiwan.png" x="28" y="-3" width="375" height="667"></image>
            <g :class="{townline: townShow, pharmacy: pharmacyShow, old: oldShow, emergency: emergencyShow}">
              <g v-for="town in topoTown">
                <path :d="town.d" :id="town.location" :class="town.class"></path>
              </g>
            </g>
            <g>
              <g v-for="country in topoCountry">
                <path :d="country.d" :id="country.location" class="country" :style="{fillOpacity: country.fillOpacity, fill: country.fill}"></path>
              </g>
            </g>
            <g>
              <g v-for="mappath in mapPathData">
                <path :d="mappath.d" class="road" :style="{strokeDashoffset: mappath.offset, strokeDasharray: mappath.stroke}"></path>
              </g>
            </g>
            <g>
              <g v-for="country in hospitals">
                <circle v-for="hospital in country" :cx="hospital.cx" :cy="hospital.cy" class="point" :class="[hospital.country]" :style="{fillOpacity: hospital.fillOpacity, fill: hospital.fill}"></circle>
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
    <ContentContainer background-color="#FFFFFF">
      <h2>衛福部：將加強偏鄉基礎醫療照顧</h2>
      <p><br/></p>
      <p>針對醫療不均問題，衛福部次長薛瑞元表示，醫療資源不均是必然，因為醫院經營有固定成本，但他曾在屏東擔任過衛生局長，深知偏鄉醫療的問題，「偏鄉醫療強度不足，明顯跟都會相比有差距。」尤其是重急症、慢性病，以及急難災害的醫療能力都需要檢討改善。<br/><br/>他強調現下會先盤點各縣市的醫院功能，衛福部仍期待各縣市的當地醫院有一級醫院的能力，此外部分縣市因幅員遼闊，導致基礎醫療照顧能量不足，並且後送機制也有待重整改善。<br/><br/>薛瑞元表示，2018年會著重加強基礎醫療照顧，包括建立醫療人員派出模式，「老人、病人無法出門，我們醫院派人出去，這些在原鄉行之多年，非原鄉也要建立這種模式。」<br/><br/>此外，許多偏鄉人口老化，部分鄉鎮老年人口占比達20%以上，有領藥看病的需求。因此，他表示要強化前端預防工作，包括定期檢查、了解老人的服藥狀況等，避免老人家慢性病急性發作，2018年將在部分偏鄉試辦。</p>
    </ContentContainer>
    <Section id="section-2" :src="section2" :srcWeb="section2_web" text="臨終最後一哩路 你的家鄉安寧嗎？"/>
    <div class="space" id="r-11"></div>
    <div class="textbox" id="r-12">
      <h2 class="hidden-xs hidden-sm">前5名「沙漠」縣市 6成以上鄉鎮區缺安寧資源</h2>
      <br/>
      寧靜的走完人生旅程，是許多病患的願望，但「好死」仰賴專業及資源。國內安寧療護現分為住院、共照、居家與社區三塊，《聯合報》盤點各縣市資料，發現縣市間資源落差極大：基隆市、新竹縣、台東縣、高雄市及苗栗縣等倒數5名縣市，6成6以上鄉鎮區是三種安寧資源都沒有的「沙漠」；反觀「安寧綠洲」台北市與嘉義市，各鄉鎮區都有安寧療護資源可用。病人想安心走完臨終前最後一哩路，必須遠赴外縣市找安寧病床才能圖個好死，在地善終成為奢望。
    </div>
    <div class="space"></div>
    <div class="textbox" id="r-13">
      以沙漠比率（零資源的鄉鎮區數／總鄉鎮區數）最高的基隆市為例，7個鄉鎮區內僅信義區、安樂區兩區有安寧病床、居家安寧團隊等資源，剩餘的5個鄉鎮區內什麼都沒有，沙漠比率7成1。扣除區域數量、距離等因素，台灣醫療改革基金會日前公布最新的「在地好命善終資源」排行榜中，基隆也僅有兩顆星。<br/><br/>基隆市衛生局表示，基隆幅員小，各區到醫院距離都很近，民眾要找醫院的安寧資源不會太難。但衛生局也坦言，居家安寧推動確實不易，民眾觀念、社區診所參與意願都需要提升，會持續推動。
    </div>
    <div class="space"></div>
    <div class="space" id="r-14"></div>
    <div class="space" id="r-15"></div>
    <ContentContainer background-color="#FFFFFF" id="r-16">
      <p>安寧療護資源分布的最綿密的「綠洲」縣市台北市及嘉義市，縣市內所有鄉鎮區都有至少一種安寧療護資源可利用，沙漠比率0％，民眾就近就可以找到安寧病床，或居家安寧團隊，來陪伴家人走過人生最後一哩路。</p>
      <p><br/></p>
      <p>日前，一根鼻胃管引發作家瓊瑤與平家之間的激烈衝突，怎麼做對失智的皇冠出版社創辦人平鑫濤最好，社會有不同的聲浪；前體育主播傅達仁遠赴瑞士，成為安樂死機構合格會員，再次掀起各界對「善終」的關注與討論。</p>
      <p><br/></p>
      <p>台灣安樂死尚未合法化，仍有爭議和疑慮待討論；安寧療護的推動，則已是各界共識，減少末期病人在病榻上的折磨，是安寧療護的功能與目標。儘管參與的醫療院所家數、病人利用率看似逐年增加，從數據及訪談中，發現安寧療護發展目前仍遇到<b>三大問題：</b></p>
      <p><br/></p>
      <h2>一、各縣市落差大，住哪裡決定能否「好好死」？</h2>
      <p><br/></p>
      <p>台灣醫療改革基金會2015年首度公布「在地好命善終排行榜」，凸顯出縣市間的安寧療護資源差距。兩年多過去，安寧療護資源在各縣市間還是有不小落差。醫改會研究員辜智芬直言，預算不足是共同原因。</p>
      <p><br/></p>
      <p>醫改會曾詢問過各地衛生局長，多數都提到預算不足問題。辜智芬說，衛生佔整體市政經費平均僅有1.4％到1.5％，這些經費要發展癌篩、衛教、急重難症等多元項目，能撥給安寧療護的微乎其微。</p>
      <p><br/></p>
      <p>微薄的經費更考驗縣市首長的態度。辜智芬說，安寧療護朝居家、社區方向發展已是世界潮流，「縣市首長的眼光有沒有跟上？」居家、社區安寧除了錢，更仰賴人力投入、政策支持，若縣市首長不重視，縣市本身資源再多也沒用；反觀一些小縣市，願意關注這塊，資源不多也能做出成績。</p>
      <p><br/></p>
      <p>健保署表示，安寧療護資源目標希望以次醫療區（數個鄰近鄉鎮為一個次醫療區）都有，目前還沒達到，會持續推動。</p>
      <p><br/></p>
      <h2>二、居家、社區遍地開花 恐是「海市蜃樓」</h2>
      <p><br/></p>
      <p>目前全台有一百多間診所、衛生所投入社區安寧，但第一線醫師和健保署都坦言，取得資格是一回事，真正有在做的診所還是很有限，<b>一方面是病人仍對醫院的依賴仍深，另一方面是缺乏誘因與武器、後援，讓想做的醫生卻步</b>。</p>
      <p><br/></p>
      <p>在南投縣推動社區醫療照護整合團隊多年的南投醫院放射腫瘤科主任翁益強，從診所不敢做、不知怎麼做，到順利讓數個診所投入、與南投醫院緊密合作，過程中發現不少問題。</p>
      <p><br/></p>
      <p>翁益強指出，開業的診所醫生不像醫院有社工師，團隊相對弱，13小時的教育訓練也讓很多人擔心只學到皮毛，且健保給付打七折、花費的時間多，真正敢做、願意做的診所不多。</p>
      <p><br/></p>
      <p>就算有心要做，基本的「武器」取得都有困難。舉例來說，想做替末期病人止痛所需的嗎啡因是管制藥，一般診所難以保管，馬上就「卡關」。<b>翁益強說，與醫院合作，能解決藥物的問題，團隊也可以透過開會共同討論病情、彼此間隨時互相支援，減少診所壓力；行政方面，他找了一位熟悉安寧療護的個案管理師，協助診所管理</b>。</p>
      <p><br/></p>
      <p>翁益強建議，現在雖規定診所做社區安寧療護，需要找一間「後援醫院」，但制度並沒有給後援醫院任何誘因，兩者之間只是一紙合約，沒有太實質的合作，應設法提供誘因增加醫院投入醫院，醫院、診所連結緊密，才能真正落實末期病人對「就近」的需求。</p>
      <p><br/></p>
      <h2>三、我不是癌症，但也想好好走完人生最後一哩路</h2>
      <p><br/></p>
      <div id="draw-1"></div>
      <p><br/></p>
      <p>從數據中發現，不論是癌症或非癌病人，在過世前一個月使用安寧療護的比率都是逐年提升，但非癌病人利用率明顯偏低、成長緩慢。</p>
      <p><br/></p>
      <p>翁益強指出，癌症有癌症防治法、有專責的資源和單位在管，推廣安寧觀念效果會很快速；<b>反觀非癌病人，死亡人口中雖有3／4病人是「非癌」，但不像癌症有專責的推廣單位，觀念提升的速度自然較慢</b>。</p>
      <p><br/></p>
      <p>此外，非癌病人相較癌症病人，疾病病程變數較大，仰賴臨床判斷，觀念上也不太會連結到安寧。不過翁益強認為，所謂的「變數大」，其實反映了醫生也需要教育，早期癌症治療也很多人反彈安寧，但現在觀念已慢慢推廣，當醫生都有安寧療護的觀念，就更能判斷何時需要安寧療護介入、真正幫助病人。</p>
    </ContentContainer>
    <Section id="section-3" :src="section3" :srcWeb="section3_web" text="醫生病人相對論：為什麼我們等不到彼此？"/>
    <ContentContainer background-color="#FFFFFF">
      <h2>一、要看病，到底難在哪？</h2>
      <p><br/></p>
      <p>依仰阿嬤（88），與年邁的先生同住在花蓮縣秀林鄉文蘭村重光部落，距離市區門諾等大醫院約40分鐘車程。三女兒謝美麗（Nanu）今年6月結束市區的美髮店生意，返家與父母同住。</p>
      <p><br/></p>
      <div class="people">
        <div class="people-img">
          <img src="./assets/xie.jpg" alt="">
        </div>
        <div class="people-name">
          病人家屬謝美麗
        </div>
      </div>
      <p><br/></p>
      <p>我媽有高血壓、心臟病、氣喘、呼吸中止等病史，9年前曾因心臟衰竭和肺積水住院治療。慢性病需要規律服藥，加上看眼科、骨科，一個禮拜至少要來回醫院兩次。</p>
      <p><br/></p>
      <p>要拿這些藥、看這些病，一定要去大醫院，家附近也沒有什麼小醫院或診所，主要都是去門諾醫院和慈濟醫院兩家。花蓮山區多數都沒有公車可搭，還沒有申請復康巴士的時候，只能叫計程車，單趟1000到1200元跑不掉。</p>
      <p><br/></p>
      <p><b>有錢也不一定叫得到車，我們住得遠，司機不一定願意來，或者要求加價；媽媽坐輪椅，需要無障礙計程車，車子更少。</b></p>
      <p><br/></p>
      <p>以前還沒回家住時，因為去醫院很麻煩，媽媽若不舒服，就把家裡不知道擺了多久的成藥、草藥拿出來隨便吃吃，或者挖出醫生很久前開的止痛藥吃，找到車子才能到市區看醫生。</p>
      <p><br/></p>
      <p>媽媽前幾年曾跟我妹妹在台北住了幾年，那時在台北馬偕醫院看醫生，好方便，坐捷運幾站就到，跟這裡差很多。</p>
      <p><br/></p>
      <div class="people">
        <div class="people-img">
          <img src="./assets/lin.jpg">
        </div>
        <div class="people-name">
          復康巴士司機林枝憲
        </div>
      </div>
      <p><br/></p>
      <p>偏鄉的老人家，住愈遠通常經濟狀況也愈差，很多更伴隨著獨居、老老照顧、隔代教養等多重困境，處境更加艱難。</p>
      <p><br/></p>
      <p>曾接過一個個案，家住在一個大陡坡上方，個案阿公和我說，全家只有他兒子有辦法推他出門、下坡、進城，若兒子不在，他就只能困在家中。</p>
      <p><br/></p>
      <p><b>花蓮面積4600多平方公里，北到南全長173公里，但全花蓮只有32輛復康巴士，卻有6500個個案有需求，供不應求</b>。花蓮大眾運輸不普及，有也都在台九線（主幹道）上，根本伸不進鄉鎮角落。</p>
      <p><br/></p>
      <p>我們不是專業護理人員，依規定不能到個案家中搬動個案，以免出事時責任歸屬難釐清。但有時候，<b>一些阿公阿嬤自己搭車看診，進門後會問「可不可以把我搬上床？」我幫了，就違反規定，但不幫，老人家就得在輪椅上坐到子女下班後才能上床</b>，看著他們的眼睛，怎麼忍心拒絕？</p>
      <p><br/></p>
      <p><br/></p>
      <div class="doctor">
        <div class="doctor-underline"></div>
        <div class="doctor-text">聽聽醫生怎麼說</div>
      </div>
      <p><br/></p>
      <p><br/></p>
      <div class="people">
        <div class="people-img">
          <img src="./assets/yu.jpg">
        </div>
        <div class="people-name">
          台灣在宅醫療學會理事長<br/>余尚儒
        </div>
      </div>
      <p><br/></p>
      <p><b>醫療是對應需求，你今天要活下去，多遠都要去</b>，偏鄉民眾為了就醫，往往需要花更高的交通費與時間成本。在山區看醫生，1個小時、1個半小時都是正常的。</p>
      <p><br/></p>
      <p>以我服務的台東縣東河鄉都蘭村為例，位處偏遠山區，植物人病患要緊急送醫，搭救護車到台東市區最近的醫院至少要1小時，單程就要花5000元。一般病患搭計程車，單趟也要500元。</p>
      <p><br/></p>
      <p>還有更多偏鄉居民，每個月得花上千元坐計程車往返醫院，就為了領慢性病藥，因為<b>整個東河鄉有9000人口，連一間健保藥局都沒有</b>。民眾要拿藥，只能舟車勞頓、花費昂貴車資跑到大醫院。</p>
      <p><br/></p>
      <p>城鄉醫療資源分布不均，偏鄉地區民眾雖然繳一樣的健保費，但都市與偏鄉享受到的醫療資源卻不一樣。且偏鄉青年人口流失，很多獨居老人、老老照顧，加上多屬經濟弱勢，更加深偏鄉醫療困境。</p>
      <p><br/></p>
      <div class="img-contain">
        <img class="lazyload hidden-md hidden-lg" src="./assets/3-1.jpg">
        <img class="lazyload hidden-xs hidden-sm" src="./assets/3-1_web.jpg">
      </div>
      <p><br/></p>
      <h2>二、好不容易看了病，拿藥也難</h2>
      <p><br/></p>
      <div class="people">
        <div class="people-img">
          <img src="./assets/xie.jpg">
        </div>
        <div class="people-name">
          病人家屬謝美麗
        </div>
      </div>
      <p><br/></p>
      <p>高血壓那些慢性病，可以拿慢性長期處方籤，醫生一次開三個月的藥，在醫院拿第一個月，後面兩個月就拿處方籤去藥局拿藥，不用常跑醫院。聽起來方便，但對我來說根本沒用。</p>
      <p><br/></p>
      <p>我家附近、甚至整個秀林鄉一間藥局，拿到處方籤，要去哪裡找後面兩個月的藥？還是得跑去市區。<p>
      <p><br/></p>
      <p><b>花蓮慈濟醫院每週四會有巡迴醫療來看診，我曾問過巡迴醫療的醫師，能不能在他（指巡迴醫療）這邊開藥、拿藥，他說沒辦法，他們沒有配備慢性病所需的藥品，不能隨便開，也沒辦法幫我們從醫院帶需要的藥過來。</b></p>
      <p><br/></p>
      <p><br/></p>
      <div class="doctor">
        <div class="doctor-underline"></div>
        <div class="doctor-text">聽聽醫生怎麼說</div>
      </div>
      <p><br/></p>
      <p><br/></p>
      <div class="people">
        <div class="people-img">
          <img src="./assets/yu.jpg">
        </div>
        <div class="people-name">
          台灣在宅醫療學會理事長<br/>余尚儒
        </div>
      </div>
      <p><br/></p>
      <p>偏鄉地區人口外移嚴重，藥師不願意到偏鄉開業，這就跟在鄉下開一家便利商店，容易虧損倒閉是一樣的道理，<b>市場競爭的結果，偏鄉社區型藥局生存不易</b>。可是如果所有醫療資源分配都由市場機制決定，偏鄉居民要怎麼活？目前政府也沒有提供補助或獎勵措施，難以吸引藥師到偏鄉開設藥局。</p>
      <p><br/></p>
      <p><b>現在偏鄉地區大多靠社區藥局的藥師送藥到府，減少民眾往返醫院領藥的不便</b>。不像傳統藥師多半在藥局等待患者上門，這些「行動藥師」步出藥局，走進老人家和行動不便病人的家中，送上慢性處方籤和提供藥物諮詢服務。不過，藥師外出送藥都沒有額外收入，完全是靠熱心、志願性提供服務。</p>
      <p><br/></p>
      <div class="img-contain">
        <img class="lazyload hidden-md hidden-lg" src="./assets/3-2.jpg">
        <img class="lazyload hidden-xs hidden-sm" src="./assets/3-2_web.jpg">
      </div>
      <p><br/></p>
      <h2>三、偏鄉醫療最需要的是什麼？</h2>
      <p><br/></p>
      <div class="people">
        <div class="people-img">
          <img src="./assets/xie.jpg" alt="">
        </div>
        <div class="people-name">
          病人家屬謝美麗
        </div>
      </div>
      <p><br/></p>
      <p>最需要的當然還是交通要方便，或者是要能有就近看病、拿藥的地方。</p>
      <p><br/></p>
      <p>有復康巴士是很好，但不好預約，而且看醫生的時間很難預料，有些醫生會體諒你、知道你要趕車，讓你先看，但這樣的醫生是少數。有時候醫生叫我們轉診到其他科，一轉就轉半天，趕不上巴士怎麼辦？</p>
      <p><br/></p>
      <div class="people">
        <div class="people-img">
          <img src="./assets/lin.jpg">
        </div>
        <div class="people-name">
          復康巴士司機林枝憲
        </div>
      </div>
      <p><br/></p>
      <p>政府統計說花蓮居民平均擁有的病床數、醫護人員人數多，但花蓮所有醫療資源都集中在花蓮市和吉安鄉，鄉鎮間差異很大，近的去醫院很快，遠的要看個病難如登天，醫療資源要深入到每個聚落、分布均勻。</p>
      <p><br/></p>
      <p><br/></p>
      <div class="doctor">
        <div class="doctor-underline"></div>
        <div class="doctor-text">聽聽醫生怎麼說</div>
      </div>
      <p><br/></p>
      <p><br/></p>
      <div class="people">
        <div class="people-img">
          <img src="./assets/yu.jpg">
        </div>
        <div class="people-name">
          台灣在宅醫療學會理事長<br/>余尚儒
        </div>
      </div>
      <p><br/></p>
      <p><b>偏鄉地區不一定需要蓋大醫院，要解決偏鄉就醫可近性的問題，最重要的是要廣設基層社區診所，讓診所有「一站式」的功能</b>，除了看診外，還可以提供基本檢查服務，像是超音波、胃鏡等，日本鄉下衛生所都有這些設備，偏鄉民眾就不用為了做檢查跑到大醫院。</p>
      <p><br/></p>
      <p>但是目前診所並沒有發揮應有的功能，原因是健保給付制度對基層診所不利，診所購入醫療儀器無法獲得給付，醫師當然不願意進。很多藥物規定一定要做檢查才能開立，像失智症鑑定一定要到醫院，診所不能開失智症藥物，但是鄉下的失智症長輩要怎麼去醫院？怎麼定期回診？理論上，應該讓有認證的偏鄉診所就能開藥，才能讓當地民眾就醫需求就近獲得解決。</p>
      <p><br/></p>
      <p>要讓醫師願意到偏鄉開業，就必須<b>提高給付，讓偏鄉醫師能夠生存，才能真正解決就醫可近性的問題</b>。偏鄉基層照護，包括檢查、用藥，只要診所能做，就應該按照醫院給付，甚至是提供更好的條件。或是有一些獎勵措施，例如願意到偏鄉開藥局，政府就幫忙付藥局租金，必須提供足夠誘因，這樣才有醫師願意做。</p>
      <p><br/></p>
      <Share href="https://udn.com/upf/newmedia/2018_data/rural_medical/index.html"/>
      <Logo />
      <p><br/></p>
      <Editor>
        <div>製作人、文字：林秀姿、洪欣慈、蔡佩蓉</div>
        <div>視覺設計：許瑋琳</div>
        <div>攝影：林俊良</div>
        <div>網頁製作：鄭偉廷</div>
        <div>監製：董谷音、蔡幸怡</div>
        <div>2018.01</div>
        <a href="https://drive.google.com/drive/folders/1ct46pOKKLWETsLBMXwY0SugBVS2qqB8U" target="_blank"><div id="refer">原始資料來源</div></a>
      </Editor>
			<p><br/></p>
      <p><br/></p>
      <Question href="https://www.surveycake.com/s/KpQKN" text="填寫閱讀體驗問卷"/>
      <p><br/></p>
      <p><br/></p>
      <Relate>
				<a href="https://udn.com/upf/newmedia/2017_data/taipei-railway-workshop/index.html" target="_blank" slot="relate-1">
					<img class="lazyload" data-src="https://udn.com/upf/newmedia/image/projects/201712_taipei-railway-workshop.jpg"/>
					<p>遷不走的火車職人魂 360VR看82歲的台北機廠</p>
				</a>
				<a href="https://udn.com/upf/newmedia/2017_data/farewell/index.html" target="_blank" slot="relate-2">
					<img class="lazyload" data-src="https://udn.com/upf/newmedia/image/projects/201711_farewell.jpg"/>
					<p>好好說再見 插畫記林杰樑走後1500天</p>
				</a>
				<a href="https://udn.com/upf/newmedia/2017_data/ideal/index.html" target="_blank" slot="relate-3">
					<img class="lazyload" data-src="https://udn.com/upf/newmedia/image/projects/201710_ideal.jpg"/>
					<p>人人90歲的時代 你想怎麼活？</p>
				</a>
				<a href="https://udn.com/upf/newmedia/2017_data/poverty/index.html" target="_blank" slot="relate-4">
					<img class="lazyload" data-src="https://udn.com/upf/newmedia/image/projects/201710_poverty.jpg"/>
					<p>被遺忘的孩子 我8歲，我住貨櫃屋</p>
				</a>
			</Relate>
      <p><br/></p>
			<FBComment href="https://udn.com/upf/newmedia/2018_data/rural_medical/index.html" />
      <p><br/></p>
      <Foot/>
    </ContentContainer>
  </div>
</template>

<script>

import _ from 'lodash'

import Cover from '@/components/CoverFixedBg'
import Section from '@/components/Section'
import Question from '@/components/Question'
import HeadBar from '@/components/HeadBar'
import { Indicator, ContentContainer, Quote, Share, Editor, Relate, FBComment, Foot, Logo } from 'udn-newmedia-vue-components'

import bg from '@/assets/bg.jpg'
import bg_web from '@/assets/bg_web.png'

import section1 from '@/assets/section1.jpg'
import section2 from '@/assets/section2.jpg'
import section3 from '@/assets/section3.jpg'
import section1_web from '@/assets/section1_web.jpg'
import section2_web from '@/assets/section2_web.jpg'
import section3_web from '@/assets/section3_web.jpg'

var offsetDefault = [134.19932556152344, 66.69547271728516, 97.28009033203125]
var no_pharmacy = ["南化區", "龍崎區", "田寮區", "永安區", "茂林區", "桃源區", "那瑪夏區", "坪林區", "平溪區", "貢寮區", "烏來區", "橫山鄉", "峨眉鄉", "五峰鄉", "大同鄉", "造橋鄉", "三灣鄉", "獅潭鄉", "泰安鄉", "鹿谷鄉", "中寮鄉", "大埔鄉", "滿州鄉", "三地門鄉", "霧臺鄉", "泰武鄉", "來義鄉", "獅子鄉", "牡丹鄉", "豐濱鄉", "富里鄉", "秀林鄉", "萬榮鄉", "卓溪鄉", "大武鄉", "東河鄉", "綠島鄉", "延平鄉", "海瑞鄉", "達仁鄉", "金峰鄉", "蘭嶼鄉", "白沙鄉", "望安鄉", "七美鄉", "金寧鄉", "烈嶼鄉", "烏坵鄉", "南竿鄉", "北竿鄉", "莒光鄉", "東引鄉"]
var old_town = ["坪林區", "平溪區", "貢寮區", "橫山鄉", "峨眉鄉", "三灣鄉", "獅潭鄉", "鹿谷鄉", "中寮鄉", "南化區", "龍崎區", "田寮區", "豐濱鄉", "富里鄉", "東河鄉"]
var no_emergency = ["三重區","蘆洲區","八里區","五股區","林口區","泰山區","竹北市","新豐鄉","湖口鄉","新埔鎮","竹東鎮","寶山鄉","北埔鄉","峨眉鄉","芎林鄉","橫山鄉","關西鎮","尖石鄉","五峰鄉","後龍鎮","西湖鄉","通霄鎮","苑裡鎮","竹南鎮","頭份市","三灣鄉","南庄鄉","造橋鄉","芳苑鄉","二林鎮","埤頭鄉","竹塘鄉","大城鄉","田中鎮","二水鄉","田尾鄉","北斗鎮","溪州鄉","埔里鎮","仁愛鄉","魚池鄉","國姓鄉","草屯鎮","南投市","名間鄉","中寮鄉","竹山鎮","鹿谷鄉","集集鎮","水里鄉","信義鄉","口湖鄉","北港鎮","水林鄉","元長鄉","四湖鄉","虎尾鎮","大埤鄉","土庫鎮","西螺鎮","二崙鄉","崙背鄉","褒忠鄉","臺西鄉","東勢鄉","麥寮鄉","斗六市","林內鄉","莿桐鄉","古坑鄉","斗南鎮","民雄鄉","竹崎鄉","番路鄉","中埔鄉","阿里山鄉","大埔鄉","梅山鄉","大林鎮","溪口鄉","新港鄉","朴子市","六腳鄉","東石鄉","布袋鎮","太保市","鹿草鄉","義竹鄉","旗山區","美濃區","六龜區","甲仙區","杉林區","內門區","茂林區","桃源區","那瑪夏區","枋寮鄉","春日鄉","枋山鄉","獅子鄉","恆春鎮","車城鄉","滿洲鄉","牡丹鄉","馬公市","湖西鄉","白沙鄉","西嶼鄉","望安鄉","七美鄉","關山鎮","池上鄉","海端鄉","鹿野鄉","延平鄉","成功鎮","長濱鄉","東河鄉","大武鄉","達仁鄉","金峰鄉","太麻里鄉","萬榮鄉","鳳林鎮","光復鄉","豐濱鄉","玉里鎮","富里鄉","卓溪鄉","瑞穗鄉"]
var dessert_leak = ["基隆市", "新竹縣", "臺東縣", "高雄市", "苗栗縣"]
var dessert_rich = ["臺北市", "嘉義市"]

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
      mapPathData: [
        {stroke: 134.19932556152344, offset: 134.19932556152344, d: 'M263.7,409.2v-2.1v-2.4l-2-0.7c0,0-0.6-1,0.3-1.6c0.9-0.7,2.4-1.5,2.4-1.5l1.4-2c0,0,0.4-2.3,0.6-2.8c0.1-0.5,0-2,0-2l0.4-1.4v-1.1c0,0,1.2-1.3,1.3-2.8c0-1.4,0.7-4.6,0.9-5.2c0.3-0.5,1.9-2.9,1.9-2.9v-1.5c0,0,4-4.6,4.2-4.8c0.2-0.2,0.3-2.6,0.4-3.3c0.1-0.7-0.7-1.5-1.3-2c-0.6-0.5-1.1-1.1-1.3-2.1s-0.7-2.5-0.9-3.5s-0.2-2.2,0.1-3c0.3-0.8,0.6-1.8,0.6-2.7c0-1-0.1-2.1,0.2-2.9c0.4-0.8,1.1-2.1,1.4-3.2c0.3-1,2-3.1,2.3-4c0.3-0.9,1.8-3.9,1.4-4.8c-0.4-1-1.5-1.3-1.6-2s-0.2-1.7,0.3-2.4s1.3-1.2,1.7-2c0.4-0.8,1.3-1.6,1.6-1.7s1.2-1.5,1.3-1.9s1-0.4,0.9-1.8c-0.1-1.4,0.2-2.2,0.4-2.9c0.2-0.7,0.9-2,0.9-2.7s-0.6-2.2,0.4-3.1c1-0.9,1.7-0.2,2.2-0.5c0.6-0.3,2.7-0.9,2.8-1.4s6-9.5,6-9.5s0.8-0.9,2.7-2.2c2-1.3,3.6-3.7,3.6-3.7s0-1.3,0.3-2.5c0.2-1.1,4.2-6.6,4.2-6.6'},
        {stroke: 66.69547271728516, offset: 66.69547271728516, d: 'M239.4,479.1l-2.7-1.1c0,0,0,0,0-0.1l0.1-1.2c0,0,0-0.1-0.1-0.1l-2.7-0.6c-0.1,0-0.1-0.1,0-0.1l0.8-0.3c0,0,0.1-0.1,0-0.1l-2-2.1c0,0,0,0,0,0v-0.7c0,0,0,0,0,0l0.4-0.6c0,0,0,0,0-0.1l-0.4-1.3c0,0,0,0,0,0l-0.4-0.5c0,0,0,0,0-0.1l0.7-2.2c0,0,0,0,0,0l-0.1-2.4c0,0,0,0,0,0l-0.2-1.5c0,0,0,0,0,0l0.3-1c0,0,0,0,0,0l0.6-0.5c0,0,0,0,0-0.1c0-0.2,0-1.1,0.1-1.4c0.1-0.3,0.9-0.9,0.8-1.1c-0.1-0.2-0.8-0.2-0.9-0.3c0,0,0,0,0,0l-0.6-0.5c0,0,0,0,0-0.1c0-0.2,0.2-1.4,0.5-1.5c0.3,0,1.7,0,2,0c0,0,0.1,0,0.1,0l0.3-1c0,0,0,0,0,0v-1.4c0,0,0,0,0,0c0.1-0.2,1-1.2,0.8-1.3c-0.2-0.1-0.4-0.2-0.5-0.2c0,0,0,0,0-0.1l0.4-1.6c0,0,0,0,0,0l0.8-0.9c0,0,0,0,0,0l0.4-1.1c0,0,0,0,0,0l0-0.8c0,0,0,0,0,0l6.4-17.9c0,0,0,0,0,0l0.1-1.8c0,0,0,0,0-0.1l2.6-1.7c0,0,0.1,0,0.1,0.1v0.5c0,0,0,0.1,0.1,0.1h1'},
        {stroke: 97.28009033203125, offset: 97.28009033203125, d: 'M194.1,598.3c0,0,0.2,0-1.8-0.5c-2-0.5-2.4-0.9-3.6-2.6s-1.6-4.1-2.2-5.1s0.1-1.9,0-3.2c-0.1-1.4-1.8-3.4-2.8-4.7s-1.3-1.9-0.9-4.3c0.4-2.5-0.5-5.4-1.1-6.6c-0.6-1.2-0.8-1.7-1.3-4.3c-0.5-2.6-1.4-6.5-1.4-6.5s-2.6-4.6-3.7-6c-1.1-1.4-1.4-3.8-1.8-6.3c-0.4-2.5-2.8-5.6-4.1-6.8c-1.3-1.1-1.5-3.9-1.6-4.8c-0.1-1-1.7-3.6-1.7-3.6l-1.5-2l-4-1.7l-4.6-2.5l-3.1-3.1l-6.2-2.1'},
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
            {x: 340.330, y: 139.039, text: '大安森林公園'},
            {x: 305, y: 124, text: '6分'},
            {x: 314, y: 131, text: '2.3公里'}
          ],
          opacity: 0
        }
      },
      selectedText: '選擇縣市',
      selectedCountry: {location: '總計', population: 23539816, old: 3106105, hospital: 115, beds: 69, employee: 103, cancer: 0, noresource: 0, dessert: 71.4},
      bg: bg,
      bg_web: bg_web,
      section1: section1,
      section2: section2,
      section3: section3,
      section1_web: section1_web,
      section2_web: section2_web,
      section3_web: section3_web,
      part2: false,
      topoTown: null,
      topoCountry: null,
      hospitals: null,
      mapTranslate: {
        x: '0px',
        y: '0px'
      },
      mapcontent: '',
      mapScale: false,
      stageFlag: [false, false, false, false, false ,false, false ,false , false, false, false, false, false, false],
      mapMenu: false,
      mapSelectShow: false,
      mapTooltipShow: false,
      townShow: false,
      pharmacyShow: false,
      oldShow: false,
      emergencyShow: false,
      boardShow: false,
      boardFont: {
        fontSize: '40px',
        color: '#EF4326'
      },
      mapmark: ''
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
          location: topo.features[i].properties.name,
          fill: '#FFFFFF',
          fillOpacity: 0
        })
      }
      that.topoCountry = temp
      console.log(temp)
    })

    d3.json('./static/town.topojson', function(data){

      var topo = topojson.feature(data, data.objects.map)
      var temp = []
      
      for(var i in topo.features){
        var class_temp = 'town'
        if(no_pharmacy.indexOf(topo.features[i].properties.TOWNNAME) != -1){
          class_temp += ' pharmacy'
        }
        if(old_town.indexOf(topo.features[i].properties.TOWNNAME) != -1){
          class_temp += ' old'
        }
        if(no_emergency.indexOf(topo.features[i].properties.TOWNNAME) != -1){
          class_temp += ' emergency'
        }
        temp.push({
          d: path(topo.features[i]),
          location: topo.features[i].properties.TOWNNAME,
          class: class_temp
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
        var fill = '#EF4326'
        if(d[i].country == '景點'){
          fill = '#000000'
        }
        temp[d[i].country].push({
          location: d[i].location,
          name: d[i].name,
          country: d[i].country,
          cx: prj([d[i].lat, d[i].lon])[0],
          cy: prj([d[i].lat, d[i].lon])[1],
          fillOpacity: 0,
          fill: fill
        })
      }
      console.log(temp)
      that.hospitals = temp

    })

    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    expand: function(){
      this.mapMenu = !this.mapMenu
    },
    menuClick: function(d){
      this.mapMenu = false
      this.selectedText = this.main[d].location
      this.selectedCountry = this.main[d]
      this.mapTooltipShow = true
      this.mapScale = true
      this.mapTranslate.x = this.main[d].x
      this.mapTranslate.y = this.main[d].y
    },
    handleScroll: function(){
      var currentH = window.pageYOffset + window.innerHeight

      $('.doctor-underline').each(function(){
        if(currentH > $(this).offset().top){
          $(this).addClass('max')
        }
      })

      if(currentH > $('#map-contain').offset().top + window.innerHeight*3 / 4 && currentH < $('#r-1').offset().top + window.innerHeight / 2){
        this.mapSelectShow = true
      }
      else if(currentH > $('#r-11').offset().top + window.innerHeight*3 / 4 && currentH < $('#r-12').offset().top + window.innerHeight / 2){
        this.mapSelectShow = true
      }
      else{
        this.mapSelectShow = false
      }

      if(currentH < $('#map-contain').offset().top){
        if(this.stageFlag[0] == false){
          _.fill(this.stageFlag, false)
          this.stageFlag[0] = true
        }
        else{
          return
        }
        this.mapScale = false
        this.boardShow = false
        this.mapTooltipShow = false

        this.mapcontent = ''

        for(var i in this.hospitals){
          for(var j in this.hospitals[i]){
            this.hospitals[i][j].fillOpacity = 0
          }
        }
        
      }

      if(currentH >= $('#map-contain').offset().top + window.innerHeight / 2 && currentH < $('#r-1').offset().top + window.innerHeight/2){
        if(this.stageFlag[1] == false){
          _.fill(this.stageFlag, false)
          this.stageFlag[1] = true
        }
        else{
          return
        }
        
        this.mapTranslate.x = '0px'
        this.mapTranslate.y = '0px'
        this.mapScale = false
        this.mapTooltipShow = true
        this.boardShow = false
        this.mapcontent = '破解數字迷思 從地圖看偏鄉就醫的苦'

        this.selectedText = '選擇縣市',
        this.selectedCountry = {location: '總計', population: 23539816, old: 3106105, hospital: 115, beds: 69, employee: 103, cancer: 0, noresource: 0, dessert: 71.4}

        for(var i in this.hospitals){
          if(i == '景點'){
            continue
          }
          for(var j in this.hospitals[i]){
            this.hospitals[i][j].fillOpacity = 0.8
            this.hospitals[i][j].fill = '#EF4326'
          }
        }
      }

      if(currentH >= $('#r-1').offset().top + window.innerHeight/2 && currentH < $('#r-2').offset().top){
        this.mapTooltipShow = false
        this.boardShow = false
        this.mapcontent = ''
      }

      if(currentH >= $('#r-2').offset().top && currentH < $('#r-3').offset().top){
        if(this.stageFlag[2] == false){
          _.fill(this.stageFlag, false)
          this.stageFlag[2] = true
        }
        else{
          return
        }
        this.mapTranslate.x = '-110px'
        this.mapTranslate.y = '-15px'
        this.mapScale = true
        this.boardShow = true
        this.boardFont.fontSize = '26px'
        this.boardFont.color = '#EF4326'
        this.selectedCountry = this.main[15]

        this.mapcontent = ''

        for(var i in this.mapTextData){
          this.mapTextData[i].opacity = 0
        }

        for(var i in this.hospitals){
          for(var j in this.hospitals[i]){
            if(i == '花蓮縣'){
              this.hospitals[i][j].fillOpacity = 0.8
              this.hospitals[i][j].fill = '#EF4326'
            }
            else{
              this.hospitals[i][j].fillOpacity = 0
            }
          }
        }

        for(var i in this.topoCountry){
          this.topoCountry[i].fillOpacity = 0
          this.topoCountry[i].fill = '#FFFFFF'
        }

        for(var i in this.mapPathData){
          this.mapPathData[i].offset = offsetDefault[i]
        }
      }

      if(currentH >= $('#r-3').offset().top && currentH < $('#r-4').offset().top){
        if(this.stageFlag[3] == false){
          _.fill(this.stageFlag, false)
          this.stageFlag[3] = true
        }
        else{
          return
        }
        this.mapTranslate.x = '-110px'
        this.mapTranslate.y = '-15px'
        this.mapScale = true
        this.boardShow = false

        this.mapcontent = ''

        for(var i in this.mapTextData){
          this.mapTextData[i].opacity = 0
        }
        this.mapTextData['map1'].opacity = 1
        
        this.hospitals['花蓮縣'][0].fillOpacity = 0
        this.hospitals['花蓮縣'][1].fillOpacity = 0
        this.hospitals['花蓮縣'][2].fillOpacity = 0.8
        this.hospitals['花蓮縣'][2].fill = '#000000'
        this.hospitals['臺東縣'][0].fillOpacity = 0

        for(var i in this.topoCountry){
          this.topoCountry[i].fillOpacity = 0
          this.topoCountry[i].fill = '#FFFFFF'
        }

        this.topoCountry[8].fillOpacity = 0.7
        this.topoCountry[8].fill = '#EF4326'
        
        for(var i in this.hospitals['景點']){
          this.hospitals['景點'][i].fillOpacity = 0  
        }  
        this.hospitals['景點'][0].fillOpacity = 0.8

        for(var i in this.mapPathData){
          this.mapPathData[i].offset = offsetDefault[i]
        }
        this.mapPathData[0].offset = 0
        
      }

      if(currentH >= $('#r-4').offset().top && currentH < $('#r-5').offset().top){
        if(this.stageFlag[4] == false){
          _.fill(this.stageFlag, false)
          this.stageFlag[4] = true
        }
        else{
          return
        }
        
        this.mapTranslate.x = '-45px'
        this.mapTranslate.y = '-180px'
        this.mapScale = true

        this.mapcontent = ''

        for(var i in this.mapTextData){
          this.mapTextData[i].opacity = 0
        }
        this.mapTextData['map2'].opacity = 1
        
        this.hospitals['花蓮縣'][2].fillOpacity = 0
        this.hospitals['臺東縣'][0].fillOpacity = 0.8
        this.hospitals['臺東縣'][0].fill = '#000000'
        this.hospitals['屏東縣'][5].fillOpacity = 0

        for(var i in this.topoCountry){
          this.topoCountry[i].fillOpacity = 0
          this.topoCountry[i].fill = '#FFFFFF'
        }

        this.topoCountry[7].fillOpacity = 0.7
        this.topoCountry[7].fill = '#EF4326'
        
        for(var i in this.hospitals['景點']){
          this.hospitals['景點'][i].fillOpacity = 0  
        }  
        this.hospitals['景點'][1].fillOpacity = 0.8

        for(var i in this.mapPathData){
          this.mapPathData[i].offset = offsetDefault[i]
        }
        this.mapPathData[1].offset = 0
      }

      if(currentH >= $('#r-5').offset().top && currentH < $('#r-6').offset().top){
        if(this.stageFlag[5] == false){
          _.fill(this.stageFlag, false)
          this.stageFlag[5] = true
        }
        else{
          return
        }

        this.mapTranslate.x = '21px'
        this.mapTranslate.y = '-240px'
        this.mapScale = true

        this.mapcontent = ''

        for(var i in this.mapTextData){
          this.mapTextData[i].opacity = 0
        }
        this.mapTextData['map3'].opacity = 1
        
        this.hospitals['臺東縣'][0].fillOpacity = 0
        this.hospitals['屏東縣'][5].fillOpacity = 0.8
        this.hospitals['屏東縣'][5].fill = '#000000'

        for(var i in this.topoCountry){
          this.topoCountry[i].fillOpacity = 0
          this.topoCountry[i].fill = '#FFFFFF'
        }

        this.topoCountry[6].fillOpacity = 0.7
        this.topoCountry[6].fill = '#EF4326'
        
        for(var i in this.hospitals['景點']){
          this.hospitals['景點'][i].fillOpacity = 0 
        }  
        this.hospitals['景點'][2].fillOpacity = 0.8

        for(var i in this.mapPathData){
          this.mapPathData[i].offset = offsetDefault[i]
        }
        this.mapPathData[2].offset = 0
        
      }

      if(currentH >= $('#r-6').offset().top && currentH < $('#r-7').offset().top){
        if(this.stageFlag[6] == false){
          _.fill(this.stageFlag, false)
          this.stageFlag[6] = true
        }
        else{
          return
        }

        this.mapTranslate.x = '-103px'
        this.mapTranslate.y = '140px'
        this.mapScale = true
        this.townShow = false
        this.pharmacyShow = false

        this.mapcontent = ''

        for(var i in this.mapTextData){
          this.mapTextData[i].opacity = 0
        }
        this.mapTextData['map4'].opacity = 1
        
        this.hospitals['屏東縣'][5].fillOpacity = 0
        this.hospitals['臺北市'][6].fillOpacity = 0.8
        this.hospitals['臺北市'][6].fill = '#000000'

        for(var i in this.topoCountry){
          this.topoCountry[i].fillOpacity = 0
          this.topoCountry[i].fill = '#FFFFFF'
        }

        this.topoCountry[12].fillOpacity = 0.7
        this.topoCountry[12].fill = '#EF4326'
        
        for(var i in this.hospitals['景點']){
          this.hospitals['景點'][i].fillOpacity = 0 
        }  
        this.hospitals['景點'][3].fillOpacity = 0.8

        for(var i in this.mapPathData){
          this.mapPathData[i].offset = offsetDefault[i]
        }

      }

      if(currentH >= $('#r-7').offset().top && currentH < $('#r-8').offset().top){
        if(this.stageFlag[7] == false){
          _.fill(this.stageFlag, false)
          this.stageFlag[7] = true
        }
        else{
          return
        }

        this.mapTranslate.x = '0px'
        this.mapTranslate.y = '0px'
        this.mapScale = false
        this.townShow = true
        this.pharmacyShow = true
        this.oldShow = false

        this.mapcontent = '52鄉鎮沒健保藥局 37萬人受影響'

        for(var i in this.mapTextData){
          this.mapTextData[i].opacity = 0
        }

        for(var i in this.topoCountry){
          this.topoCountry[i].fillOpacity = 0
          this.topoCountry[i].fill = '#FFFFFF'
        }
        
        this.hospitals['臺北市'][6].fillOpacity = 0
        
        for(var i in this.hospitals['景點']){
          this.hospitals['景點'][i].fillOpacity = 0 
        }  

      }

      if(currentH >= $('#r-9').offset().top && currentH < $('#r-10').offset().top){
        if(this.stageFlag[8] == false){
          _.fill(this.stageFlag, false)
          this.stageFlag[8] = true
        }
        else{
          return
        }
      
        this.mapTranslate.x = '0px'
        this.mapTranslate.y = '0px'
        this.mapScale = false
        this.townShow = true
        this.pharmacyShow = true
        this.oldShow = true
        this.emergencyShow = false

        this.mapcontent = '15個超高齡鄉鎮 領藥難上加難'

      }

      if(currentH >= $('#r-10').offset().top && currentH < $('#r-11').offset().top){
        if(this.stageFlag[9] == false){
          _.fill(this.stageFlag, false)
          this.stageFlag[9] = true
        }
        else{
          return
        }

        this.mapTranslate.x = '0px'
        this.mapTranslate.y = '0px'
        this.mapScale = false
        this.mapTooltipShow = false
        this.boardShow = false
        this.townShow = true
        this.pharmacyShow = false
        this.oldShow = false
        this.emergencyShow = true
        this.part2 = false

        this.mapcontent = '141鄉鎮缺緊急醫療資源 轉診像賭命'

        for(var i in this.topoCountry){
          this.topoCountry[i].fillOpacity = 0
          this.topoCountry[i].fill = '#FFFFFF' 
        }

      }

      if(currentH >= $('#r-11').offset().top && currentH < $('#r-13').offset().top){
        if(this.stageFlag[10] == false){
          _.fill(this.stageFlag, false)
          this.stageFlag[10] = true
        }
        else{
          return
        }

        this.mapTranslate.x = '0px'
        this.mapTranslate.y = '0px'
        this.mapScale = false
        this.townShow = false
        this.emergencyShow = false
        this.boardShow = false
        this.part2 = true

        this.mapcontent = '前5名「沙漠」縣市 6成以上鄉鎮區缺安寧資源'

        for(var i in this.topoCountry){
          if(dessert_rich.indexOf(this.topoCountry[i].location) != -1){
            this.topoCountry[i].fillOpacity = 1
            this.topoCountry[i].fill = '#26CAD3' 
          }
          else if(dessert_leak.indexOf(this.topoCountry[i].location) != -1){
            this.topoCountry[i].fillOpacity = 1
            this.topoCountry[i].fill = '#EF4326'
          }
          else{
            this.topoCountry[i].fillOpacity = 0
            this.topoCountry[i].fill = '#FFFFFF' 
          }
        }

      }

      if(currentH >= $('#r-13').offset().top && currentH < $('#r-14').offset().top){
        if(this.stageFlag[11] == false){
          _.fill(this.stageFlag, false)
          this.stageFlag[11] = true
        }
        else{
          return
        }
        this.mapTranslate.x = '-130px'
        this.mapTranslate.y = '170px'
        this.mapScale = true
        this.selectedCountry = this.main[17]
        this.mapTooltipShow = false
        this.boardShow = true
        this.boardFont.fontSize = '40px'
        this.boardFont.color = '#EF4326'

        this.mapcontent = ''

        for(var i in this.topoCountry){
          if(dessert_rich.indexOf(this.topoCountry[i].location) != -1){
            this.topoCountry[i].fillOpacity = 0
            this.topoCountry[i].fill = '#FFFFFF' 
          }
          else if(dessert_leak.indexOf(this.topoCountry[i].location) != -1){
            this.topoCountry[i].fillOpacity = 1
            this.topoCountry[i].fill = '#EF4326'
          }
          else{
            this.topoCountry[i].fillOpacity = 0
            this.topoCountry[i].fill = '#FFFFFF' 
          }
        }

      }

      if(currentH >= $('#r-14').offset().top && currentH < $('#r-15').offset().top){
        if(this.stageFlag[12] == false){
          _.fill(this.stageFlag, false)
          this.stageFlag[12] = true
        }
        else{
          return
        }
        
        this.mapTranslate.x = '-108px'
        this.mapTranslate.y = '155px'
        this.mapScale = true
        this.selectedCountry = this.main[1]
        this.boardShow = true
        this.boardFont.fontSize = '40px'
        this.boardFont.color = '#26CAD3'

        this.mapcontent = ''

        for(var i in this.topoCountry){
          if(dessert_rich.indexOf(this.topoCountry[i].location) != -1){
            this.topoCountry[i].fillOpacity = 1
            this.topoCountry[i].fill = '#26CAD3' 
          }
          else if(dessert_leak.indexOf(this.topoCountry[i].location) != -1){
            this.topoCountry[i].fillOpacity = 0
            this.topoCountry[i].fill = '#FFFFFF'
          }
          else{
            this.topoCountry[i].fillOpacity = 0
            this.topoCountry[i].fill = '#FFFFFF' 
          }
        }

      }

      if(currentH >= $('#r-15').offset().top && currentH < $('#r-16').offset().top){
        if(this.stageFlag[13] == false){
          _.fill(this.stageFlag, false)
          this.stageFlag[13] = true
        }
        else{
          return
        }

        this.mapTranslate.x = '50px'
        this.mapTranslate.y = '-80px'
        this.mapScale = true
        this.selectedCountry = this.main[19]
        this.boardShow = true
        this.boardFont.fontSize = '40px'
        this.boardFont.color = '#26CAD3'
        this.part2 = true

        this.mapcontent = ''

        for(var i in this.topoCountry){
          if(dessert_rich.indexOf(this.topoCountry[i].location) != -1){
            this.topoCountry[i].fillOpacity = 1
            this.topoCountry[i].fill = '#26CAD3' 
          }
          else if(dessert_leak.indexOf(this.topoCountry[i].location) != -1){
            this.topoCountry[i].fillOpacity = 0
            this.topoCountry[i].fill = '#FFFFFF'
          }
          else{
            this.topoCountry[i].fillOpacity = 0
            this.topoCountry[i].fill = '#FFFFFF' 
          }
        }

      }

    }
  },
  components: {
    Indicator, Cover, ContentContainer, Section, Quote, Share, Editor, Relate, FBComment, Foot, Logo, Question, HeadBar
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

#map-select{
  position: fixed;
  width: 110px;
  height: 28px;
  left: 20px;
  top: 140px;
  border-bottom: 1px solid #AAAAAA;
  font-size: 15px;
  color: #EF4326;
  transition: all 0.7s ease;
  background-color: #FFFFFF;
  z-index: 9;
  opacity: 0;
}

#map-select.show{
  opacity: 1;
}

#map-select.open{
  border: none;
  transform: translate(136px, 0)
}

#map-select.open span{
  display: none;
}

#map-select img{
  width: 28px;
  margin-top: -5px;
}

#map-menu{
  position: fixed;
  width: 156px;
  background-color: #F4F2F2;
  padding: 18px;
  padding-bottom: 70px;
  top: 90px;
  transition: all 0.7s ease;
  transform: translate(-100%, 0);
  height: 600px;
  overflow: scroll;
  z-index: 10;
}

#map-menu.open{
  transform: translate(0, 0);
}

.item{
  font-size: 15px;
  width: 120px;
  line-height: 37px;
  height: 37px;
  color: #828282;
  text-align: center;
}

.item.selected{
  background-color: #F15A24;
  color: #FFFEFE;
}

#map-tooltip{
  position: fixed;
  width: 260px;
  background-image: url('./assets/tooltips.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  bottom: 75px;
  right: 10px;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.7s ease;
  z-index: -1;
}

#map-tooltip.show{
  opacity: 1;
}

.tooltip-title{
  font-size: 18px;
  font-weight: bold;
  color: #4D4D4D;
  line-height: 1;
  margin-top: 5px;
}

#tooltip-detail{
  border-top: 1px solid #000000;
  margin-top: 7px;
  padding-top: 3px;
}

.detail{
  height: 30px;
  line-height: 30px;
  font-size: 13px;
  color: #4D4D4D;
  border-bottom: 1px solid #AAAAAA;
}

.detail.noborder{
  border: none;
}

.detail span{
  position: absolute;
  right: 19px;
  color: #F15A24;
}

.point{
  r: 2;
  transition: all 0.7s ease;
  stroke-width: 0.5;
  /* fill: #EF4326; */
  /* fill-opacity: 0.8; */
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

.townline .town{
  stroke-opacity: 1
}

.pharmacy .town.pharmacy{
  fill-opacity: 1;
  fill: #EF4326;
}

.old .town.old{
  fill-opacity: 1;
  fill: #630808
}

.emergency .town.emergency{
  fill-opacity: 1;
  fill: #EF4326;
}

.rich .country.rich{
  fill: #26CAD3;
}

.dessert .country.dessert{
  fill: #EF4326;
}

.country{
  /* fill: #FFFFFF; */
  /* fill-opacity: 0; */
  stroke: #B5B5B6;
  stop-opacity: 1;
  stroke-width: 0.5;
  transition: all 0.7s ease;
}

.road{
  fill:none;
  stroke:#000000;
  stroke-width: 1.5;
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

#map-board{
  position: fixed;
  width: 320px;
  left: 50%;
  margin-left: -160px;
  bottom: 20%;
  background: white;
  padding: 20px;
  opacity: 0;
  transition: all 0.7s ease;
  z-index: -1;
}

#map-board.show{
  opacity: 1;
}

#board-title{
  font-weight: bold;
  font-size: 26px;
  color: #4D4D4D;
}

.board-text{
  font-size: 18px;
  color: #4D4D4D;
  line-height: 32px;
}

.board-text span{
  position: absolute;
  right: 19px;
}

.number{
  font-weight: bold;
}

#map-content{
  top: -2%;
  z-index: -1;
  position: fixed;
}

#map-content.show{
  opacity: 1;
}

.img-contain img{
  width: 100%;
}

.doctor{
  font-size: 26px;
  text-align: center;
  font-weight: bold;
  position: relative;
}

.doctor-text{
  position: relative;
}

.doctor-underline{
  width: 0px;
  height: 10px;
  position: absolute;
  top: 25px;
  z-index: 0;
  left: 50%;
  background: #EF4326;
  margin-left: -120px;
  transition: all 0.7s ease;
}

.doctor-underline.max{
  width: 240px;
}

.people{
  height: 100px;
}

.people-img{
  width: 100px;
  height: 100px;
  float: left;
}

.people-name{
  height: 100px;
  padding-left: 120px;
  padding-top: 35px;
  border-bottom: 1px solid #B5B5B5;
}

#refer{
  color: #EF4326;
  border-bottom: 2px solid #EF4326;
  display: inline-block;
}

#map-say{
  position: fixed;
  width: 160px;
  text-align: left;
  left: 20px;
  bottom: 10px;
  font-size: 11px;
  color: #A4A2A2;
  padding-left: 10px;
  transition: opacity 0.7s ease;
  opacity: 0;
  z-index: -1;
}

#map-say.show{
  opacity: 1;
}

.circle{
  width: 7px;
  height: 7px;
  display: inline-block;
  position: absolute;
  top: 5px;
  left: 0;
  border-radius: 50%;
  background-color: #EF4326;
}

@media screen and (min-width: 768px) and (max-width: 1023px){
  #report p{
    font-size: 17px;
  }
  .textbox{
    padding: 30px 100px;
    font-size: 20px;
  }
  body{
    overflow-y: scroll;
    overflow-x: hidden;
  }
  #svg-contain{
    top: 13%;
    left: 50%;
    margin-left: -187.5px;
  }
  #map-content{
    top: 0%;
  }
  #map-select{
    left: 100px;
    top: 170px;
  }
  #map-tooltip{
    right: 40px;
    bottom: 90px;
  }
}

@media screen and (min-width: 1024px){
  
  .people-name{
    border-bottom: none;
  }
  .textbox h2{
    font-size: 30px;
  }
  .textbox{
    height: 100vh;
    width: 440px;
    position: absolute;
    right: 15%;
    box-shadow: none;
  }
  svg{
    width: auto;
  }
  #svg-contain{
    left: 20%;
    top: 5%;
  }
  #map-board{
    left: 100px;
    margin-left: 0;
  }
  #map-say{
    left: 3%;
    bottom: 3%;
  }
  .space-s{
    height: 100vh;
  }
  #r-15{
    height: 0;
  }
  #map-tooltip{
    left: 100px;
  }
  #map-select{
    left: 30px;
  }
  #cover-icon {
    width: 200px;
    left: 11%;
    transform: scale(-1, 1);
  }
  #cover #cover-contain{
    width: 700px;
    left: 17%;
    top: 32%;
  }
}

@media screen and (min-width: 1024px) and (max-height: 800px){
  #map-tooltip{
    left: 100px;
  }
  #map-board{
    left: 100px;
  }
}

@media screen and (min-width: 1441px){
  .textbox{
    right: 20%;
  }
}

</style>
