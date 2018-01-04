<template>
    <div id="head-bar" :style="{top: top+'px', backgroundColor: color}">
        <div id="hbutton-contain" :class="{open: isOpen}">
            <slot></slot>
            <div id="logo-contain" class="hidden-lg">
                <div class="logo-block">
                    <div class="logo">
                        <a href="https://udn.com/news/index" target="_blank"><img src="https://udn.com/upf/newmedia/image/udn-logo.svg"></a>
                    </div>
                    <div class="logo">
                        <a href="https://udn.com/upf/newmedia/udn_newmedia/" target="_blank"><img src="https://udn.com/upf/newmedia/image/nmd-logo.svg"></a>
                    </div>
                </div>
            </div>
        </div>
        <div id="icon">
            <a href="."><img src="https://udn.com/upf/newmedia/image/udn_logo_circle.png"></a>
        </div>
        <div id="hbutton" class="squre hidden-lg">
            <div id="nav-icon" :class="{open: isOpen}" @click="handleClick">
                <span :style="{backgroundColor: buttonColor}"></span>
                <span :style="{backgroundColor: buttonColor}"></span>
                <span :style="{backgroundColor: buttonColor}"></span>
                <span :style="{backgroundColor: buttonColor}"></span>
            </div>
        </div>
    </div>
</template>

<script>
import Utils from 'udn-newmedia-utils'
export default {
    name: 'indicator',
    props: ['color', 'buttonColor'],
    data: function(){
        return{
            top: 0,
            isOpen: false
        }
    },
    mounted: function(){
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleClick: function(){
            this.isOpen = !this.isOpen
            ga("send", {
                "hitType": "event",
                "eventCategory": "Ham Click",
                "eventAction": "click",
                "eventLabel": "[" + Utils.detectPlatform() + "] [" + document.querySelector('title').innerHTML + "] [Ham Click]"
            });
        },
        handleScroll: function(event){
            let currentH = window.pageYOffset
            if(currentH < window.innerHeight / 2){
                this.top = 0
            }
            else{
                if(window.innerWidth <= 1024){
                    this.top = 4
                }
                else{
                    this.top = 6
                }
                
            }
        }
    }
}
</script>

<style scoped>
    .logo{
        width: 140px;
        display: inline-block;
    }
    #head-bar {
        position: fixed;
        background-color: #FFFFFF;
        color: #000000;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 99999;
        transition: opacity 0.7s ease;
        box-shadow: -2.8px 1.1px 7px 0 rgba(4, 0, 0, 0.05);
    }
    #icon{
        position: absolute;
        top: 0;
    }
    #icon img {
        width: 36px;
        margin-top: -3px;
        margin-left: 5px;
    }
    #hbutton{
        width: 46px;
        height: 46px;
        top: 0;
        right: 0;
        padding: 0 5px;
        position: absolute;
    }
    #nav-icon{
        width: 46px;
        height: 46px;
        position: relative;
        transform: rotate(0deg);
        transition: .5s ease-in-out;
        cursor: pointer;
        opacity: 1;
    }
    #nav-icon span{
        display: block;
        position: absolute;
        height: 4px;
        width: 30px;
        margin: 0 auto;
        background: #FFFFFF;
        border-radius: 2px;
        opacity: 1;
        right: 12px;
        transform: rotate(0deg);
        transition: .25s ease-in-out;
    }
    #nav-icon span:nth-child(1) {
        top: 12px;
    }
    #nav-icon span:nth-child(2),#nav-icon span:nth-child(3) {
        top: 21px;
    }
    #nav-icon span:nth-child(4) {
        top: 30px;
    }
    #nav-icon.open span:nth-child(1) {
        top: 12px;
        width: 0%;
    }
    #nav-icon.open span:nth-child(2) {
        transform: rotate(45deg);
    }
    #nav-icon.open span:nth-child(3) {
        transform: rotate(-45deg);
    }
    #nav-icon.open span:nth-child(4) {
        top: 30px;
        width: 0%;
    }
    #hbutton-contain {
        position: absolute;
        cursor: pointer;
        top: 0;
        right: 0;
    }
    .hbutton{
        padding: 0 12px;
        color: #ACABAB;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        cursor: pointer;
        float: left;
    }
    .hbutton:hover{
        color: #FFFFFF;
        background-color: #EF4326;
    }
    .hbutton.hbutton-select{
        background-color: #EF4326;
        color: #FFFFFF;
    }
    @media screen and (max-width: 1024px){
        #head-bar{
            height: 46px;
        }
        #icon {
            height: 46px;
            line-height: 46px;
            text-align: left;
            width: 100%;
        }
        #hbutton-contain{
            top: 46px;
            background-color: #FFFFFF;
            height: 100vh;
            width: 100%;
            transition: transform 0.7s ease;
            transform: translate(0, -110%);
        }
        #hbutton-contain.open{
            transform: translate(0, 0);
        }
        .hbutton {
            margin: 1px auto 0 auto;
            background-color: #FFFFFF;
            color: #ACABAB;
            border-bottom: 1px solid #ACABAB;
            height: 60px;
            padding: 0;
            line-height: 60px;
            font-size: 20px;
            text-align: center;
            margin-top: 1px;
            letter-spacing: 8px;
            float: none;
        }
        #logo-contain{
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 20%;
        }
    }
    
    @media screen and (min-width: 1025px){
        #head-bar{
            height: 50px;
        }
        #icon {
            height: 50px;
            line-height: 50px;
        }
    }
</style>