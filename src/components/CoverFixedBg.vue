<template>
    <div id="cover">
        <slot></slot>
        <div id="back-bg-contain" :style="{opacity: opacity}">
            <div class="mask" :style="{opacity: maskOpacity}"></div>
            <img class="hidden-md hidden-lg" :src="src" >
            <img class="hidden-xs hidden-sm" :src="srcWeb">
        </div>
    </div>
</template>

<script>

export default {
    props: ['src', 'srcWeb'],
    methods: {
        handleScroll: function(e){
            var currentH = window.pageYOffset
            if(currentH < 300 ){
                if(window.innerWidth > 1024){
                    this.maskOpacity = 0
                }
                else{
                    this.maskOpacity = 0.6
                }
                
            }
            else{
                if(window.innerWidth > 1024){
                    this.maskOpacity = 0.7
                }
                else{
                    this.maskOpacity = 0.9
                }
            }
            if(currentH < (this.$el.offsetTop + window.innerHeight*2)){
                this.opacity = 1
            }
            else{
                this.opacity = 0
            }
        }
    },
    mounted: function(){
        window.addEventListener('scroll', this.handleScroll)
    },
    data: function(){
        return{
            opacity: 1,
            maskOpacity: 0.6
        }
    }
}
</script>

<style scoped>
    #cover {
        height: 100%;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    #back-bg-contain{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background: #FFFFFF;
        transition: opacity 0.7s ease;
    }
    .mask{
        width: 100%;
        height: 100%;
        background-color: #FFFFFF;
        position: absolute;
        top: 0;
        transition: opacity 0.7s ease;
    }
    .sub-title{
        font-size: 28px;
        color: #616161;
        letter-spacing: -0.6px;
    }
    h1{
        font-size: 50px;
        letter-spacing: -1px;
        color: #010101;
        font-weight: bold;
        line-height: 1.1;
        text-shadow: 0 0px 18px rgba(48,48,48,1);
        margin: 0;
    }
    img{
        width: 100%;
    }
    @media screen and (max-width: 767px){
        h1{
            font-size: 45px;
        }
    }
    @media screen and (min-width: 768px) and (max-width: 1024px){
        h1{
            font-size: 45px;
        }
    }
    @media screen and (min-width: 1025px){
        .sub-title{
            font-size: 38px;
        }
    }
    
</style>