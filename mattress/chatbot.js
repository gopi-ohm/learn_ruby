let botFactory = (function(){
    function BotUI() {
        // TODO: specify scope for methods and variables
        this.maindiv = document.createElement("DIV");
        this.botUserId = null;
        this.sessionAttributes = {};
        this.slideIndex = [];
        this.slideDivId = "oibot_slides_";
        this.initialChatScript = [{"isbefore":true,"text":"Welcome to Gates. Can I help you find your perfect mattress? " },
        {"isbefore":false,"text":"Are you ready to find your mattress?" }];
        this.assetsUrl = "https://smartbotgates.s3.amazonaws.com/assets/";

        this.chatHTML = `
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <div class="container">
                <div class="row">
                  <div id="oibot_smallchat">
                    <div class="layout layout-open layout-expand layout-right" style="border-radius: 10px;">
                      <div class="messenger_messenger">
                        <div class="messenger_header">
                          <span id="oibot_headertitle" class="headertitle">
                            <span class="welcome">Welcome to Gates</span>
                            <br/>
                            <span>
                              <span class="powered_by">POWERED BY</span>
                              <span class="anc" onclick="window.open('https://xselltechnologies.com', '_blank');event.stopPropagation();"> XSELL Technologies</span>
                            </span>
                          </span>

                          <div id="oibot_minimize" class="chat_minimize_icon oibot_icon">
                            <svg viewBox="90 100 375 375">
                              <g id="oibot_minimize_thin">
                                <path fill="#ffffff" d="M1779.3,853.3H12.7v85.4h1766.7V853.3z"
                                  transform="scale(.215, -.215) translate(400, -2300)"></path>
                              </g>
                            </svg>
                          </div>

                          <div id="oibot_light" class="chat_minimize_icon oibot_icon tooltip">
                            <img src="`+this.assetsUrl+`darkmode.png" width="14px">
                            <!--<span class="tooltiptext">Toggle Dark Mode</span>-->
                          </div>
                          <div id="oibot_closeicon" class="chat_close_icon oibot_icon">
                           <img src="`+this.assetsUrl+`close.png" width="10px">
                          </div>
                        </div>
                        <div id="oibot_messenger_content" class="messenger_content">
                          <div id="oibot_conversation" class="messages">
                          </div>
                          <div id="oibot_closechat" class="Input Input-blank">
                            <div class="closechat">
                              Do you want to close the chat ?
                            </div>
                            <div class="buttons">
                              <div id="oibot_canceldiv" class="suggestionbutton close">CANCEL</div>
                              <div id="oibot_okdiv" class="suggestionbutton close">CONFIRM</div>
                            </div>
                          </div>

                          <div id="oibot_userinputdiv" class="Input Input-blank">
                            <div id="oibot_container">
                              <div class="container_input">
                                <!--<form id="oibot_chatform" class="Input_field">-->
                                  <input type="text" class="Input_field"
                                    id="oibot_userinput" size="80" value="" placeholder="Enter your message">
                                <!--</form>-->
                              </div>
                              <div class="container_push">
                                <button id="oibot_pushchat" class="Input_button Input_button-send">
                                  <div class="oibot_icon">
                                   <img src="`+this.assetsUrl+`send.png" class="sendbutton" width="18px">
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="oibot_popup">
                        <!-- <div class="chathead" style="background-image: url('`+this.assetsUrl+`avatar.jpeg');"></div>-->
                        <div class="chathead" style="background-image: url(https://mattressassets.s3.amazonaws.com/assets1/gateslogo.jpeg);"></div>
                        <span class="text">Welcome to Gates. Can I help you find your perfect mattress? </span>
                      </div>
                  </div>
                  <div id="oibot_chaton" class="chat_on">
                    <span class="chat_on_icon">
                      <svg viewBox="0 0 600 600">
                        <defs>
                          <filter id="oibot_dropshadow" height="140%">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="15"></feGaussianBlur>
                            <feOffset result="offsetblur" dx="10" dy="10"></feOffset>
                            <feComponentTransfer>
                              <feFuncA type="linear" slope="0.8"></feFuncA>
                            </feComponentTransfer>
                            <feMerge>
                              <feMergeNode></feMergeNode>
                              <feMergeNode in="SourceGraphic"></feMergeNode>
                            </feMerge>
                          </filter>
                        </defs>
                        <g id="oibot_comments-o" class="designstudio-container">
                          <circle class="designstudio-circle" cx="50%" cy="50%" r="260" fill="#3498db" linejoin="round"
                            stroke="#ffffff" stroke-width="0" fill-opacity="1" position="absolute"></circle>
                          <path fill="#ffffff"
                            d="M704 1152q-153 0 -286 -52t-211.5 -141t-78.5 -191q0 -82 53 -158t149 -132l97 -56l-35 -84q34 20 62 39l44 31l53 -10q78 -14 153 -14q153 0 286 52t211.5 141t78.5 191t-78.5 191t-211.5 141t-286 52zM704 1280q191 0 353.5 -68.5t256.5 -186.5t94 -257t-94 -257 t-256.5 -186.5t-353.5 -68.5q-86 0 -176 16q-124 -88 -278 -128q-36 -9 -86 -16h-3q-11 0 -20.5 8t-11.5 21q-1 3 -1 6.5t0.5 6.5t2 6l2.5 5t3.5 5.5t4 5t4.5 5t4 4.5q5 6 23 25t26 29.5t22.5 29t25 38.5t20.5 44q-124 72 -195 177t-71 224q0 139 94 257t256.5 186.5 t353.5 68.5zM1526 111q10 -24 20.5 -44t25 -38.5t22.5 -29t26 -29.5t23 -25q1 -1 4 -4.5t4.5 -5t4 -5t3.5 -5.5l2.5 -5t2 -6t0.5 -6.5t-1 -6.5q-3 -14 -13 -22t-22 -7q-50 7 -86 16q-154 40 -278 128q-90 -16 -176 -16q-271 0 -472 132q58 -4 88 -4q161 0 309 45t264 129 q125 92 192 212t67 254q0 77 -23 152q129 -71 204 -178t75 -230q0 -120 -71 -224.5t-195 -176.5z"
                            transform="scale(.195, -.195) translate(600, -2000)"></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>`;
        this.stylesrc = `
              div#oibot_maindiv * {
                box-sizing: content-box;
                line-height: normal;
              }
              div#oibot_maindiv .Input * {
                box-sizing: border-box;
              }

              #oibot_smallchat {
                font-family: "Lato", sans-serif;
                font-weight: normal;
              }
              .oibot_userrequest {
                padding: 10px;
                border-radius: 10px 0 10px 10px;
                max-width: 75%;
                margin-left: auto;
                background-color: #141414;
                color: #FFFFFF;
                word-break: break-word;
              }
              .dark-mode .oibot_userrequest {
                background-color: #FFFFFF;
                color: #141414;
              }

              .sendbutton{
                position:absolute;
                right:14px;
              }

              #oibot_maindiv .tooltip {
                position: relative;
                display: inline-block;
                opacity: 1;
              }
              #oibot_maindiv .tooltip .tooltiptext {
                visibility: hidden;
                margin-top:34px;
                width: 41px;
                background-color: #3080E2;
                color: white;
                text-align: center;
                padding: 0 0;
                position: absolute;
                z-index: 1;
              }
              #oibot_maindiv .tooltip:hover .tooltiptext {
                visibility: visible;
              }

              .chathead{
                background-color: #e4e9f0;
                background-size: cover;
                border-radius: 45px;
                width: 45px;
                height: 45px;
                // display: inline-block;
              }
              #oibot_popup {
                align-items: flex-end;
                display: block;
                flex-direction: column;
                width: 100%;
                max-width: 300px;
                padding-top: 20px;
                z-index: 10;
              }
              #oibot_popup {    
                border:1px solid #3497db;
                color: #3497db;
                border-radius:13px;
                box-sizing:border-box;
                background-color:white;
              box-shadow:0 5px 10px 0 #3497db;
                max-width:290px;
                padding:10px;
                height:65px;
                position: fixed;
                font-size:17px;
                right: 32px;
                bottom: 108px;
              }
              #oibot_popup::after {
                content:'';
                width:20px;
                height:20px;
                border-radius:4px;
                z-index:-1;
                background-color:white;
                position:absolute;
                bottom:-6px;
                right:11px;
                transform:rotate(45deg);
              }
              #oibot_popup span {
                display: inline-block;
              }
              #oibot_popup span.text {
                width: calc(100% - 70px);
                margin-left: 20%;
                margin-top: -14%;
              }

              #oibot_maindiv {
                font-size:15px;
                font-style: normal;
              }

              #oibot_container {
                display: flex;
              }
              .container_input {
                width: calc(100% - 50px);
                height: 30px;
                margin-left: 10px;
              }
              .container_push {
                width: 40px;
                margin-top: 5px;
              }

              a {
                font-size: 15px;
              }
              a:hover {
                color: red;
              }
              a:link {
                color: blue;
              }
              a:active {
                color: blue;
              }
              a:visited {
                color: blue;
              }

              .oibot_botresponse {
                margin: 0px auto 0px 20px;
                padding: 10px;
                border-radius: 0 10px 10px 10px;
                min-width: 60%;
                max-width: 85%;
                background-color: #F0F0F0;
                color: #000000;
                word-break: break-word;
              }
              .dark-mode .oibot_botresponse {
                background-color: #a0a0a0;
                color: #FFFFFF;
              }
              .botOptionResponse {
                margin: 0px;
              }
              .optionbutton {
                background-color: #3080E2;
                color: #FFFFFF;
                padding: 5px;
                margin: 10px auto;
                width: 80%;
                border-radius: 20px;
                text-align: center;
                cursor: pointer;
              }
              .botSuggestionResponse {
                width: 100%;
                overflow-x: hidden;
                overflow-y: hidden;

                min-height: 60px;
                margin: 5px auto 0 0px;
                font-size: 14px;
                font-style: italic;
                position:relative;
              }
              .botError {
                margin: 4px;
                margin-left: 80px;
                padding: 4px 10px 4px 10px;
                border-radius: 4px;
                text-align: right;
                min-width: 60%;
                max-width: 85%;
                float: right;
                background-color: #f77;
              }
              .sugbutton {
                background-color: #7b8189; /* Green */
                border: none;
                color: white;
                padding: 10px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 17px;
                margin: 4px 2px;
                cursor: pointer;
                border-radius: 25%;
              }

              #oibot_smallchat .messages, #oibot_smallchat .messages_list {
                -webkit-box-flex: 1;
                -webkit-flex-grow: 1;
                -ms-flex-positive: 1;
                flex-grow: 1;
              }
              #oibot_smallchat .messages p.botOptionResponse span {
                display: block;
              }
              #oibot_smallchat .messages p.botSuggestionResponse span {
                display: inline-block;
              }
              .chat_close_icon {
                cursor:pointer;
                color: #f77;
                font-size:10px;
              }
              .chat_minimize_icon {
                cursor:pointer;
                color: #f77;
                font-size:10px;
                margin-right:15px;
              }
              .headertitle {
                list-style:none;
                display:list-item;
                width:calc(100% - 60px);
                cursor:pointer;
                font-size:19px;
              }
              .headertitle .welcome {
                margin-left: 85px;
              }
              .headertitle > span:last-child {
                margin-left: 80px;
                display: inline;
              }
              .headertitle .powered_by {
                opacity: 0.8;
                font-size:10px;
              }
              .headertitle .anc {
                margin-left: 2px;
                text-decoration:none;
                color:#FFFFFF;
                font-size:11px;
                font-weight: bold;
              }
              .chat_on {
                position: fixed;
                z-index: 10;
                width: 70px;
                height: 70px;
                right: 15px;
                bottom: 20px;
                background-color: #4286f4;
                color: #fff;
                border-radius: 50%;
                text-align: center;
                padding: 3px;
                padding-top: 5px;
                box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)!important;
                cursor: pointer;
                display: block;
              }

              #oibot_smallchat .layout {
                pointer-events:auto;
                box-sizing:content-box!important;
                z-index:999999999;
                position:fixed;
                bottom:20px;

                min-width:50px;
                max-width:300px;
                max-height:30px;
                display:-webkit-box;
                display:-webkit-flex;
                display:-ms-flexbox;
                display:flex;
                -webkit-box-orient:vertical;
                -webkit-box-direction:normal;
                -webkit-flex-direction:column;
                -ms-flex-direction:column;
                flex-direction:column;
                -webkit-box-pack:end;
                -webkit-justify-content:flex-end;
                -ms-flex-pack:end;
                justify-content:flex-end;
                border-radius:50px;
                box-shadow:5px 0 20px 5px rgba(0,0,0,.1);
                -webkit-animation:appear .15s cubic-bezier(.25,.25,.5,1.1);
                animation:appear .15s cubic-bezier(.25,.25,.5,1.1);
                -webkit-animation-fill-mode:forwards;
                animation-fill-mode:forwards;
                opacity:0;
                -webkit-transition:right .1s cubic-bezier(.25,.25,.5,1),bottom .1s cubic-bezier(.25,.25,.5,1),min-width .2s
                cubic-bezier(.25,.25,.5,1),max-width .2s cubic-bezier(.25,.25,.5,1),min-height .2s cubic-bezier(.25,.25,.5,1),max-height
                .2s cubic-bezier(.25,.25,.5,1),border-radius 50ms cubic-bezier(.25,.25,.5,1) .15s,background-color 50ms
                cubic-bezier(.25,.25,.5,1) .15s,color 50ms cubic-bezier(.25,.25,.5,1) .15s;
                transition:right .1s cubic-bezier(.25,.25,.5,1),bottom .1s cubic-bezier(.25,.25,.5,1),min-width .2s
                cubic-bezier(.25,.25,.5,1),max-width .2s cubic-bezier(.25,.25,.5,1),min-height .2s cubic-bezier(.25,.25,.5,1),max-height
                .2s cubic-bezier(.25,.25,.5,1),border-radius 50ms cubic-bezier(.25,.25,.5,1) .15s,background-color 50ms
                cubic-bezier(.25,.25,.5,1) .15s,color 50ms cubic-bezier(.25,.25,.5,1) .15s
              }

              #oibot_smallchat .layout-right {
                right:20px;
              }

              #oibot_smallchat .layout-expand {
                height:510px;
                min-height:510px;
                width: 380px;
                min-width: 380px;
                overflow: hidden;
                display:none;
              }
              #oibot_smallchat .layout-mobile {
                bottom:10px;
              }
              #oibot_smallchat .layout-mobile.layout-open {
                width:calc(100% - 20px);
                min-width:calc(100% - 20px);
              }
              #oibot_smallchat .layout-mobile.layout-expand {
                bottom:0;
                height:100%;
                min-height:100%;
                width:100%;
                min-width:100%;
                border-radius:0!important
              }
              @-webkit-keyframes appear {
                0% {
                  opacity:0;
                  -webkit-transform:scale(0);
                  transform:scale(0)
                }
                to {
                  opacity:1;
                  -webkit-transform:scale(1);
                  transform:scale(1)
                }
              }
              @keyframes appear {
                0% {
                  opacity:0;
                  -webkit-transform:scale(0);
                  transform:scale(0)
                }
                to {
                  opacity:1;
                  -webkit-transform:scale(1);
                  transform:scale(1)
                }
              }
              #oibot_smallchat .messenger_messenger {
                position:relative;
                height:100%;
                width:100%;
                min-width:300px;
                -webkit-box-orient:vertical;
                -webkit-box-direction:normal;
                -webkit-flex-direction:column;
                -ms-flex-direction:column;
                flex-direction:column
              }
              #oibot_smallchat .messenger_header,#oibot_smallchat .messenger_messenger {
                display:-webkit-box;
                display:-webkit-flex;
                display:-ms-flexbox;
                display:inline-flex;
              }
              #oibot_smallchat .messenger_header {
                -webkit-box-align:center;
                -webkit-align-items:center;
                -ms-flex-align:center;
                align-items:center;
                padding-left:10px;
                padding-right:10px;
                height:60px;
                -webkit-flex-shrink:0;
                -ms-flex-negative:0;
                flex-shrink:0;
                background-color: #3080E2;
                color: #FFFFFF;
              }


              #oibot_smallchat .messenger_header h4 {
                opacity:0;
                font-size:16px;
                -webkit-animation:slidein .15s .3s;
                animation:slidein .15s .3s;
                -webkit-animation-fill-mode:forwards;
                animation-fill-mode:forwards;
              }

              #oibot_smallchat .messenger_prompt {
                margin:0;
                font-size:16px;
                line-height:18px;
                font-weight:400;
                overflow:hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
              }

              @-webkit-keyframes slidein {
                0% {
                  opacity:0;
                  -webkit-transform:translateX(10px);
                  transform:translateX(10px)
                }
                to {
                  opacity:1;
                  -webkit-transform:translateX(0);
                  transform:translateX(0)
                }
              }
              @keyframes slidein {
                0% {
                  opacity:0;
                  -webkit-transform:translateX(10px);
                  transform:translateX(10px)
                }
                to {
                  opacity:1;
                  -webkit-transform:translateX(0);
                  transform:translateX(0)
                }
              }
              #oibot_smallchat .messenger_content {
                height: 450px;
                background-color: #FFFFFF;
                -webkit-box-flex: 1;
                -webkit-flex-grow: 1;
                -ms-flex-positive: 1;
                flex-grow: 1;
                display: -webkit-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -webkit-flex-direction: column;
                -ms-flex-direction: column;
                flex-direction: column;
              }
              #oibot_smallchat .messages {
                position: relative;
                -webkit-flex-shrink: 1;
                -ms-flex-negative: 1;
                flex-shrink: 1;
                display: -webkit-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -webkit-flex-direction: column;
                -ms-flex-direction: column;
                flex-direction: column;
                overflow-x: hidden;
                overflow-y: auto;
                padding: 10px;
                -webkit-overflow-scrolling: touch;
              }

              #oibot_smallchat .Input {
                position: relative;
                width: 100%;
                -webkit-box-flex: 0;
                -webkit-flex-grow: 0;
                -ms-flex-positive: 0;
                flex-grow: 0;
                -webkit-flex-shrink: 0;
                -ms-flex-negative: 0;
                flex-shrink: 0;
                padding-top: 6px;
                padding-bottom: 5px;
                color: #96aab4;
                background-color: #fff;
                border-top: 1px solid #e6ebea;
              }
              #oibot_userinputdiv.Input {
                height: 40px;
              }
              #oibot_smallchat .Input_field {
                width: 92%;
                resize: none;
                border: none;
                outline: none;
                background-color: #F2F2F2;
                color: #000000;
                font-size: 16px;
                border-radius: 10px;
                padding: 10px;
              }
              #oibot_smallchat .Input_button-emoji {
                right: 45px;
              }
              #oibot_smallchat .Input_button {
                width: 30px;
                height: 30px;
                margin-top:-3px;
                border-radius: 50%;
                outline: none;
                background-color: black;
                cursor: pointer;
              }
              #oibot_smallchat .Input_button-send {
                right: 15px;
              }
              #oibot_smallchat .Input-emoji .Input_button-emoji .Icon, #oibot_smallchat .Input_button:hover .Icon {
                -webkit-transform: scale(1.1);
                -ms-transform: scale(1.1);
                transform: scale(1.1);
                -webkit-transition: all .1s ease-in-out;
                transition: all .1s ease-in-out;
              }
              #oibot_smallchat .Input-emoji .Input_button-emoji .Icon path, #oibot_smallchat .Input_button:hover .Icon path {
                fill: #2c2c46;
              }
              .suggestionbutton {
                background-color: #3080E2;
                color: #FFFFFF;
                text-align: center;
                text-decoration: none;
                margin:6px -13px;
                margin-left:5%;
                cursor: pointer;
                border-radius: 16px;
                text-transform: uppercase;
                padding: 5px 30px;
              }

              .objectbutton {
                margin: 4px 2px;
                margin-left: 0;
                padding: 5px 20px;
              }
              .suggestionbutton, .optionbutton {
                border: 2px solid #3080E2;
              }
              .suggestionbutton:hover, .optionbutton:hover:not([disabled]), .optionbutton.selected {
                background-color: #FFFFFF;
                color: #3080E2;
              }

              .oibot_icon {
                width: 18px;
                height: 18px;
              }


              .typing-indicator {
                background-color: #3080E2;
                will-change: transform;
                width: auto;
                border-radius: 50px;
                padding: 10px;
                margin-left: 20px;
                width: 40px;
                position: relative;
                -webkit-animation: 2s bulge infinite ease-out;
                animation: 2s bulge infinite ease-out;
              }
              .typing-indicator::before, .typing-indicator::after {
                content: '';
                position: absolute;
                bottom: -2px;
                left: -2px;
                height: 15px;
                width: 15px;
                border-radius: 50%;
                background-color: #3080E2;
              }
              .typing-indicator::after {
                height: 8px;
                width: 8px;
                left: -9px;
                bottom: -9px;
              }
              .typing-indicator span {
                height: 10px;
                width: 10px;
                float: left;
                margin: 0 1px;
                background-color: #FFFFFF;
                display: block;
                border-radius: 50%;
                opacity: 0.4;
              }
              .typing-indicator span:nth-of-type(1) {
                -webkit-animation: 1s blink infinite .3333s;
                animation: 1s blink infinite .3333s;
              }
              .typing-indicator span:nth-of-type(2) {
                -webkit-animation: 1s blink infinite .6666s;
                animation: 1s blink infinite .6666s;
              }
              .typing-indicator span:nth-of-type(3) {
                -webkit-animation: 1s blink infinite .9999s;
                animation: 1s blink infinite .9999s;
              }
              .dark-mode .typing-indicator span {
                background-color: #000000;
              }

              @keyframes blink {
                50% {
                  opacity: 1;
                }
              }
              @keyframes bulge {
                50% {
                  transform: scale(1.05);
                }
              }


              .circle {
                border-radius:50%;
              }
              .outer {
                display:table;
                background-color:#3080E2;
                width:25px;
                height:25px;
                position:relative;
              }
              .inner {

                color:#FFFFFF;
                top:4px;
                font-size:16px;
                left:6px;
                width:50%;
                height:50%;
                position:absolute;
              }

              #oibot_closechat .closechat {
                padding: 0 0 10px 10px;
                font-size: 17px;
                color: red;
              }
              #oibot_closechat .buttons {
                padding-left:calc(100% - 245px);
              }
              #oibot_closechat .suggestionbutton {
                margin: 4px 2px;
                display: inline-block;
                padding: 5px 20px;
                font-size: 15px;
                opacity: 1;
              }

              .mySlides {
                position: relative;
                min-height: 190px;
                height: 190px;
                margin-top:10px;
                font-size: 13px;
                overflow-x: hidden;
                overflow-y: hidden;
                display: grid;
                grid-gap: 10px;
                grid-auto-flow: column;
                max-width:90%;
                margin-left:20px;
              }
              .botSlidesNav {
                position: relative;
                margin-top: -5px;
                margin-bottom: 0px;
              }
              .objectbutton.viewmore{
                position:absolute;
                font-size:13px;
                right:0px;
                top:75%;
                width:35%;
                height:15%;
                border-radius:10px;
              }
              .prev, .next , .prev1, .next1{
                cursor: pointer;
                position: relative;
                float: right;
              }
              .prev {
                right: 70px;
              }
              .next {
                right: -5px;
              }
              .prev1{
               top:-10px;
                left:10px;
              }
              .next1{
                top:-7px;
                right:-22px;
              }
              .roundedNav {
                width:8px;

                border-radius: 50%;
                background-color: #000000;
                padding: 8px 13px;
              }

              .roundedNav1 {
                position:absolute;
                color:black;
                z-index:99;
                padding: 8px 6px;
                transform:translateX(-50%);
              }
              .suggestionrow{
                  overflow-x:hidden;
                  max-width:100%;
                  white-space:nowrap;
              }
              .arrow {
                position: relative;
                width: 2.5rem;
                height: 2.5rem;
                display: inline-block;
              }
              .arrow::before, .arrow::after {
                content:"";
                position: absolute;
                background: #FFFFFF;
                border-radius: 0.2rem;
                display: block;
              }
              .arrow.left, .arrow.right {
                width: 9px;
                height: 12px;
              }
              .arrow.left::before, .arrow.right::before {
                top: 55%;
              }
              .arrow.left::after, .arrow.right::after {
                bottom: 55%;
              }
              .arrow.left::before, .arrow.left::after, .arrow.right::before, .arrow.right::after {
                left: -5%;
                height: 25%;
                width: 110%;
              }
              .arrow.left::before, .arrow.left::after {
                transform: rotate(45deg);
              }
              .arrow.left::after {
                transform: rotate(-45deg);
              }
              .arrow.right::before, .arrow.right::after {
                transform: rotate(-45deg);
              }
              .arrow.right::after {
                transform: rotate(45deg);
              }
              .carousel {
                position:relative;
                width: 160px;
                height: 100%;
                vertical-align: top;
                border-radius: 10px;
                background-color: #3080E2;
                color: #FFFFFF;
                cursor: pointer;
                opacity: 0.5;
              }
              .carousel1 {
                position:absolute;
                width:100%;
                height:70%;
                border-radius: 14px;
                background-color: #3080E2;
                color: #FFFFFF;
                cursor: pointer;
                opacity: 0.5;
              }
              .carousel1 img {
                height: 88%;
                border-radius: 10px;
                background-color: #FFFFFF;
                width: 44%;
                margin: 5px 0 0 5px;
              }
              .carousel1 span {
                position:absolute;
                width:50%;
                margin-left: 5px;
                display: inline-block;
                font-weight: bold;
                top:9px;
                right:5px;
              }
              .carousel1 .circularchart{
                position:absolute;
                left:32%;
              }
              .carousel1.active {
                opacity: 1.0;
              }
              .carousel1 .circularchart{
                left:30%;
                text-align:center;
              }
              .carousel1 img {
                height: 88%;
                border-radius: 10px;
                background-color: #FFFFFF;
                width: 44%;
                margin: 5px 0 -35px 5px;
              }

              .carousel.active {
                opacity: 1.0;
              }
              .carousel img {
                height: 100px;
                border-radius: 10px;
                background-color: #FFFFFF;
                width: 94%;
                margin: 5px 0 0 5px;
              }
              .carousel span {
                margin-left: 5px;
                display: inline-block;
                font-weight: bold;
                margin-top: 5px;
                vertical-align: top;
              }
              .circularchart {
                display: block;
                position:absolute;
                border-radius:10px;
                top:2px;
                right:10px;
                font-size:11px;
                max-width: 30px;
    //            background-color:#FF7F50;
                background-image: linear-gradient(174deg, #AFE78F 0%, #77CB56 100%);
                max-height: 30px;
                padding: 5px;
              }
              .circle1 {
                stroke: #ef8b00;
                fill: none;
                stroke-width: 2.8;
                stroke-linecap: round;
                animation: progress 1s ease-out forwards;
              }
              .mySlides.fadeSlide {
                -webkit-animation-name: fade;
                -webkit-animation-duration: 1.5s;
                animation-name: fade;
                animation-duration: 1.5s;
                transition: none;
              }

              @-webkit-keyframes fade {
                from {opacity: .4}
                to {opacity: 1}
              }
              @keyframes fade {
                from {opacity: .4}
                to {opacity: 1}
              }

              .mySlides.product {
                font-size: 14px;
                min-height: 110px;
                height: 110px;
                overflow-x: auto;
              }
              .mySlides.product .carousel {
                width: 100%;
                height: 110px;
                cursor: initial;
                background-color:black;
                color:white;
              }
              .mySlides.product .carousel1 {
                width: 100%;
                height: 110px;
                cursor: initial;
                background-color:black;
                color:white;
              }
              .mySlides.product .carousel1 .viewmore{
                display:none;
              }

             .dark-mode .mySlides.product .carousel {
                width: 100%;
                height: 110px;
                cursor: initial;
                background-color:#a0a0a0;
                color:white;
              }
              .mySlides.product .carousel img {
                height: 85%;
                width: 32%;
                margin: 7px 0 0 10px;
              }

              .mySlides.product .carousel1 img {
                height: 85%;
                width: 32%;
                margin: 7px 0 0 10px;
              }          .myslides.product .rating{
               display:none;
             }
              .mySlides.product .carousel span {
                width: calc(64% - 20px);
                margin-left: 10px;
                margin-top: 10px;
              }
              .mySlides.product .carousel1 span {
                width: calc(64% - 20px);
                margin-left: 10px;
                margin-top: 10px;
              }
              .mySlides.product .circularchart {
                top:-1px;
                left:55px;
                text-align:center;
              }
              .mySlides.product .botslidesnav{
                  position: relative;
                  margin-top: -5px;
                  margin-bottom: 0px;
              }

              div.stars {                
                width: 303px;
                display: inline-block;
                transition: .1s all ease;

              }
              div.stars.clicked{
                transition:0.6s;
              }

              .hail{
                margin-top:30px;
                font-size:14px;
                font-weight:bold;
                margin-left:39px;
              }
              input.star { display: none; }

              label.star {
                cursor:pointer;
                float: right;
                padding: 10px;
                width : 35px;
                color: #444;
                transition: all .2s;
              }

              input.star:checked ~ label.star:before {
                transition: all .25s;
                background-image: url('`+this.assetsUrl+`star-gold.png');
                background-size: 40px 40px;
                display: inline-block;
                width: 40px;
                height: 40px;
                content: "";
              }


              input.star-5:checked ~ label.star:before {
                color: #ffe52c;
                text-shadow: 0 0 20px #952;
              }

              input.star-1:checked ~ label.star:before { color: #F62; }


              label.star:not([disabled]):hover { transform: rotate(-15deg) scale(1.3);}

              label.star:before {
                transition: all .25s;
                background-image: url('`+this.assetsUrl+`star-white.png');
                background-size: 40px 40px;
                display: inline-block;
                width: 40px;
                height: 40px;
                content:"";
              }

              .dark-mode {
                background-color: black;
                color: white;
              }
              @media only screen and (min-width:320px)and (max-width:375px){
                #oibot_minimize{
                  display:none;
                }
                #oibot_smallchat .layout-right {
                  right:1px;
                }
                .headertitle{
                  font-size:13px;
                }
                #oibot_popup{
                  max-width:255px;
                }
                #oibot_popup span.text {
                  width: calc(100% - 70px);
                  margin-left: 20%;
                  margin-top: -17%;
                }
                .headertitle .welcome {
                  margin-left: 37%;
                }
                .headertitle > span:last-child {
                  margin-left: 18%;
                  display: inline;
                }
                #oibot_smallchat .messenger_header {
                  align-items:center;
                  padding-left:17px;
                  padding-right:20px;
                  height:40px;
                }
                #oibot_smallchat .layout-expand {
                  min-height:97%;
                  min-width: 100%;
                  overflow: hidden;
                }
                .mySlides.product .circularchart {
                  top:0px;
                  left:17%;
                }
                .tooltip:hover .tooltiptext {
                  visibility: hidden;
                }
                .div.stars {
                    width: 303px;
                    display: inline-block;
                    transition: .1s all ease;
                    margin-left: 0px;
                }

              }

              @media only screen and (min-width:410px) and (max-width:414px){
                #oibot_minimize{
                  display:none;
                }
                #oibot_smallchat .layout-right {
                  right:1px;
                }
                .headertitle{
                  font-size:13px;
                }
                .headertitle .welcome {
                  margin-left: 39%;
                }
                #oibot_smallchat .messenger_header {
                  align-items:center;
                  padding-left:33px;
                  padding-right:20px;
                  height:40px;
                }
                #oibot_smallchat .layout-expand {

                  min-height:97%;
                  min-width: 100%;

                  overflow: hidden;
                }
                .mySlides.product .circularchart {
                  top:0px;
                  left:20%;
                }
                .tooltip:hover .tooltiptext {
                  visibility: hidden;
                }
                .div.stars {
                    width: 303px;
                    display: inline-block;
                    transition: .1s all ease;
                    margin-left: 15px;
                }
              }
              @media only screen and (min-width:750px) and (max-width:770px){
                #oibot_minimize{
                  display:none;
                }
                #oibot_smallchat .layout-right {
                  right:1px;
                }
                .headertitle{
                  font-size:13px;
                }
                .headertitle .welcome {
                  margin-left: 39%;
                }
                .headertitle > span:last-child {
                  margin-left: 30%;
                  display: inline;
                }
                #oibot_smallchat .messenger_header {
                  align-items:center;
                  padding-left:10%;
                  padding-right:20px;
                  height:40px;
                }
                #oibot_smallchat .layout-expand {

                  min-height:70%;
                  min-width: 70%;

                  overflow: hidden;
                }
                .botSuggestionResponse {

                  font-size: 20px;

                }
                .mySlides.product .circularchart {
                  top:0px;
                  left:20%;
                }
                .tooltip:hover .tooltiptext {
                  visibility: hidden;
                }
                .div.stars {
                    width: 303px;
                    display: inline-block;
                    transition: .1s all ease;
                  padding-left:10%
                }
              }

             .rating{
               width:68%;
               display:inline;
               font-weight:bold;
               font-size:12px;
               margin-left:22px;
               margin-top:15px;
                margin-bottom:10px;
               color:white;    
               background-image: linear-gradient(174deg, #AFE78F 0%, #77CB56 100%);
               padding: 5px;
               border-radius: 10px;
             }
             
            `;

            /**
             * This function is executed when the tab is opened
             * It renders the UI components into the page
             */
        this.loadUIdesign = function () {
            let that = this;
            if (document.getElementById("oibot_maindiv")) {
                return false;
            }

            this.maindiv.setAttribute("id", "oibot_maindiv");
            /**
              * This method opens the chat window automatically after specified time
             */
            setTimeout(() => {
                that.onChatClick();
            }, 40000);

             /**
              * The following steps gets value from localstorage and assigns it to different variables
             */
            let userId = window.localStorage.getItem("isFromStorage");
            let encodedStr = window.localStorage.getItem("history");
            let encodedSession = window.localStorage.getItem("session");
            if(userId && encodedStr && encodedSession) {
                this.botUserId = userId;
                this.maindiv.innerHTML = decodeURIComponent(escape(window.atob(encodedStr)));
                this.sessionAttributes = JSON.parse(decodeURIComponent(escape(window.atob(encodedSession))));
            }
            else {
                this.botUserId = "chatbot-JS" + new Date().getTime();
                this.maindiv.innerHTML = this.chatHTML;
            }

            /**
             * The following method identifies the state of the document and makes necessary function calls
             */
            document.addEventListener("readystatechange", event => {

                if (event.target.readyState === "interactive") {
                    //alert("All HTML DOM elements are accessible");
                }

                if (event.target.readyState === "complete") {
                    document.body.appendChild(that.maindiv);

                    that.init();
                    that.bindEvents();

                    document.getElementById("oibot_script_aws") && document.getElementById("oibot_script_aws").remove();
                    /**
                     * This method assigns AWS pool credentials
                     * It is necessary in order to use AWS functionalites
                     */
                    let script = document.createElement("script");
                    script.src = "https://sdk.amazonaws.com/js/aws-sdk-2.41.0.min.js";
                    script.id = "oibot_script_aws";
                    script.onload = function () {
                        // that.getLocation();
                        AWS.config.region = "us-east-1";
                        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                            IdentityPoolId: "us-east-1:10159bc8-c7b5-443c-a6e1-3a795c0ab408",
                        });
                    };
                    that.maindiv.appendChild(script);
                       /**
                        * This method is responsible for continuing chat in new window
                        * It retrieves value from localstorage and renders it on to the page
                        */
                    if(window.localStorage.getItem("isFromStorage")) {
                        document.getElementById("oibot_chaton").click();
                        let conversationDiv = document.getElementById("oibot_conversation");

                        let sbtn = document.getElementsByClassName('optionbutton');
                        for(let sIdx=0; sIdx<sbtn.length; sIdx++) {
                            sbtn[sIdx].addEventListener("click",function(){
                                if(!this.classList.contains("close")) {
                                    that.newfunction(this);
                                }
                            });
                        }

                        let arrow1 = document.getElementsByClassName('prev1');
                        for(let pIdx=0; pIdx<arrow1.length; pIdx++) {
                            arrow1[pIdx].addEventListener("click",function(){
                                document.getElementById("oibot_suggrow").scrollBy(-300,0);
                            });
                        }
                        let arrow2 = document.getElementsByClassName('next1');
                        for(let nIdx=0; nIdx<arrow1.length; nIdx++) {
                            arrow2[nIdx].addEventListener("click",function(){
                                document.getElementById("oibot_suggrow").scrollBy(300,0);
                            });
                        }
                        /**
                        * This line of code scrolls the chat panel to the bottom after each response
                        */
                        conversationDiv.scrollTop = conversationDiv.scrollHeight;
                    }
                    that.removeStorage();
                }
            });
            if(!document.getElementById("oibot_style_common")) {
                let style = document.createElement('style');
                style.type = "text/css";
                style.id = "oibot_style_common";
                style.innerHTML = this.stylesrc;
                this.maindiv.appendChild(style);
            }
        }

        /**
           * This function is called when document is in ready state
           * It assigns initial style properties for specified elements
           */
        this.init = function () {
            let closediv = document.getElementById("oibot_closechat");
            closediv.style.display = "none";

            let that=this;
            let count= sessionStorage.getItem("pagevisit");
             if(count == null){
              count=0;
             }
             
             let pagelink=location.href;
             if(pagelink.includes("mattress")){
              count++;
               if(count==4)
               that.onChatClick();
             }                  
             sessionStorage.setItem("pagevisit",count);

            let slides = document.getElementsByClassName("botSlides");
            if(slides && slides.length) {
                for(let eIdx=0; eIdx<slides.length; eIdx++) {
                    let element = slides[eIdx];
                    let activeSlide = element.getElementsByClassName("carousel active");
                    let activeCarousel = null;
                    if(activeSlide.length) {
                        activeCarousel = activeSlide[0];
                    }
                    else if(!activeSlide.length && element.childNodes.length) {
                        activeCarousel = element.querySelector(".carousel");
                        activeCarousel.classList.add("active");
                    }
                    if(activeCarousel) {
                        this.showSlides(parseInt(activeCarousel.getAttribute("slide"))+1, eIdx);
                    }
                };
            }

            let starsAvail = document.getElementsByClassName("stars").length-1;
            let starLabels = document.querySelectorAll("label.star:not([disabled])");
            if(starLabels && starLabels.length && starsAvail > -1) {
                for(let sIdx=0; sIdx<starLabels.length; sIdx++) {
                    starLabels[sIdx].addEventListener("click", function() {
                        if(!this.getAttribute("disabled")) {
                            document.getElementsByClassName("ng-"+starsAvail)[0].style.display="none";
                            document.getElementsByClassName("greet-"+starsAvail)[0].style.display="block";
                            let form = document.getElementById("starform-"+starsAvail);
                            form.style.pointerEvents="none";
                            let starLabels1 = document.querySelectorAll("label.star:not([disabled])");
                            if(starLabels1 && starLabels1.length) {
                                for(let sIdx1=0; sIdx1<starLabels1.length; sIdx1++) {
                                    starLabels1[sIdx1].setAttribute('disabled', '');
                                }
                            }
                        }
                    })
                }
            }
        }

        /**
         * This function is called when document is in ready state
         * It assigns click/enter actions to different elements
         * Different function calls are made on each action
          */
        this.bindEvents = function () {
            let that = this;
            let minimizebtn = document.getElementById("oibot_minimize");
            let light = document.getElementById("oibot_light");
            light.addEventListener("click",function(l){
              that.darkmode();
            })
            let headertitlebtn = document.getElementById("oibot_headertitle");
            [minimizebtn, headertitlebtn].forEach(element => {
                element.addEventListener("click", function (e) {
                    if (document.getElementById("oibot_messenger_content").style.display == "none") {
                        that.onMaximizeClick();
                    }
                    else {
                        that.onMinimizeClick();
                    }
                });
            });
            let closebtn = document.getElementById("oibot_closeicon");
            closebtn.addEventListener("click", function(e) {
                that.onCloseClick();
            })
            let inputbtn = document.getElementById("oibot_userinput");
            inputbtn.addEventListener("keyup", function (event) {
            /** Number 13 is the "Enter" key on the keyboard*/
                if (event.keyCode === 13) {
            /** Cancels the default action*/
                    event.preventDefault();
            /** Trigger the button element with a click*/
                    document.getElementById("oibot_pushchat").click();
                }
            });
            let pushbtn = document.getElementById("oibot_pushchat");
            pushbtn.addEventListener("click", function (e) {
                that.pushChat();
            });
            let chatbtn = document.getElementById("oibot_chaton");
            chatbtn.addEventListener("click", function (e) {
                that.onChatClick();
            });
            let okbtn = document.getElementById("oibot_okdiv");
            okbtn.addEventListener("click", function (e) {
                that.onOkClick();
            });
            let cancelbtn = document.getElementById("oibot_canceldiv");
            cancelbtn.addEventListener("click", function (e) {
                that.onCancelClick();
            });           
        }

        /**
         * This function allows the user to send messages in the chat
         * The text is passed as argument to the specified functions
         */
        this.pushChat = function () {
            let userText = document.getElementById("oibot_userinput");
            if (userText == undefined || userText.value == undefined ||
                userText.value.trim().length == 0 || userText.disabled) {
                return false;
            }

            let msg = userText.value.trim();
            userText.value = "...";
            userText.disabled = true;

            this.showRequest(msg);
            this.sendRequest(msg);
        }

        /**
         * This function sends user messages to the lex bot
         * The paramters are text,sessionattribute values and a boolean value
         */
        this.sendRequest = function (userRequest, snAttr, callbackFn) {
            let that = this;
            let botruntime = null;
            try {
                botruntime = new AWS.LexRuntime();
            }
            catch(e) {
                let userText = document.getElementById("oibot_userinput");
                userText.value = "";
                userText.disabled = false;
                let btns = document.getElementsByClassName("optionbutton");
                for (let idx = 0; idx < btns.length; idx++) {
                    btns[idx].setAttribute("done", "true");
                    btns[idx].setAttribute("disabled", "");
                }
                that.showError("No internet connection please check your connectivity");
            }
            let sessionAttributes = this.sessionAttributes;
            if (snAttr) {
                sessionAttributes = snAttr;
            }
            let msg = userRequest.trim();
            if(sessionAttributes.isProduct && !sessionAttributes.curProductId) {
                msg = "Product A";
            }
            delete sessionAttributes.curProductId;
            delete sessionAttributes.isProduct;
            sessionAttributes.agent = navigator.userAgent;

            /**
             * Lex bot connectivity
             */
            const params = {
                botAlias: "Mattressalias",
                botName: "Mattress_bot",
                inputText: msg,
                userId: this.botUserId,
                sessionAttributes: sessionAttributes
            };
            botruntime.postText(params, function (err, data) {
                let userText = document.getElementById("oibot_userinput");
                userText.value = "";
                userText.disabled = false;
                let btns = document.getElementsByClassName("optionbutton");
                for (let idx = 0; idx < btns.length; idx++) {
                    btns[idx].setAttribute("done", "true");
                    btns[idx].setAttribute("disabled", "");
                }

                if (err) {
                    if(err.statusCode)
                        that.showError("Error:  Please try again");
                    else
                        that.showError("No internet connection please check your connectivity");
                    if(callbackFn) {
                        callbackFn(false);
                    }
                    return false;
                }
                if (data) {
                    if(data.dialogState == "ElicitIntent") {
                        delete data.sessionAttributes.buttons;
                        delete data.sessionAttributes.messages;
                        delete data.sessionAttributes.slides;
                        delete data.sessionAttributes.suggestionsObj;
                        delete data.sessionAttributes.suggestions;
                    }
                    if(!data.sessionAttributes.skipResponse){
                        that.sessionAttributes = data.sessionAttributes;
                        that.showResponse(data);
                    }
                }
                if(callbackFn) {
                    callbackFn(true);
                }
            });
        }

        /**
         * This function displays the messages sent by the user
         * The userText parameter contains value entered by the user
         * If isSecure attribute is present the text will look encrypted to the user
         */
        this.showRequest = function (userText) {
            if(userText && this.sessionAttributes.isSecure) {
                userText = userText.substring(0, userText.length/2) + "X".repeat(userText.length/2);
            }
            
            let conversationDiv = document.getElementById("oibot_conversation");
            let requestPara = document.createElement("P");
            requestPara.className = "oibot_userrequest";
            requestPara.appendChild(document.createTextNode(userText));
            conversationDiv.appendChild(requestPara);
            conversationDiv.scrollTop = conversationDiv.scrollHeight;

            let typingdiv = document.createElement("DIV");
            typingdiv.setAttribute("id", "oibot_typingindicator");
            typingdiv.className = "typing-indicator";
            let span1 = document.createElement("span");
            typingdiv.appendChild(span1);
            let span2 = document.createElement("span");
            typingdiv.appendChild(span2);
            let span3 = document.createElement("span");
            typingdiv.appendChild(span3);
            conversationDiv.appendChild(typingdiv);

            conversationDiv.scrollTop = conversationDiv.scrollHeight;
        }

        /**
         * This function is called whenever an error occurs in the chat flow
         * Overrides default error message
         */
        this.showError = function (userText) {
            let conversationDiv = document.getElementById("oibot_conversation");
            let errorPara = document.createElement("P");
            errorPara.className = "botError";
            errorPara.appendChild(document.createTextNode(userText));
            conversationDiv.appendChild(errorPara);
            conversationDiv.scrollTop = conversationDiv.scrollHeight;
            document.getElementById("oibot_typingindicator") && document.getElementById("oibot_typingindicator").remove();
        }

        /**
         * This function displays bot response in the chat window
         * The two parameter values are text and boolean
         */
        this.showPlainText = function (message, skipIcon) {
            let conversationDiv = document.getElementById("oibot_conversation");
            let botIcon = document.createElement("DIV");
            botIcon.className = "circle outer";
            let botInnerIcon = document.createElement("DIV");
            botInnerIcon.className = "circle inner";
            let html=document.createTextNode("G");
            botInnerIcon.appendChild(html);
            botIcon.appendChild(botInnerIcon);
            let responsePara = document.createElement("P");
            responsePara.className = "oibot_botresponse";
            if (message != undefined && message != null) {

                let res = message.split("htt");

                responsePara.appendChild(document.createTextNode(res[0]));
                responsePara.appendChild(document.createElement("br"));

                if (res[1]) {
                    let x = document.createElement("A");
                    let t = document.createTextNode("htt" + res[1]);
                    x.setAttribute("href", "htt" + res[1]);
                    x.setAttribute("target", "_blank");
                    x.appendChild(t);
                    responsePara.appendChild(x);
                } else {

                }
            }

            if (!skipIcon) {
                conversationDiv.appendChild(botIcon);
            }
            else {
                responsePara.style.marginTop = "6px";
            }
            conversationDiv.appendChild(responsePara);
            conversationDiv.scrollTop = conversationDiv.scrollHeight;
        }

        /**
         * This function displays preference options in buttons allowing the user to choose from
         * The buttons parameter contains sessionattribute values - button
         */
        this.showButtons = function (buttons) {
            let that = this;
            let conversationDiv = document.getElementById("oibot_conversation");

            let responsePara = document.createElement("P");
            responsePara.className = "botOptionResponse";

          /**
           * This method assigns attributes to the corresponding buttons
           */
            for (let bIdx in buttons) {
                let button = document.createElement("span");
                let data = buttons[bIdx];
                button.innerHTML = data.name;
                if(data.id) {
                    button.setAttribute("value", data.id);
                }
                else if(data.value) {
                    button.setAttribute("value", data.value);
                }
                button.className = "optionbutton";

                button.addEventListener("click", function () {
                    if (!this.getAttribute("done")) {
                        let msg = this.innerText;
                        let snAttr = that.sessionAttributes;
                        if (this.getAttribute("value")) {
                            snAttr.id = this.getAttribute("value");
                        }
                        let userText = document.getElementById("oibot_userinput");
                        userText.value = "...";
                        userText.disabled = true;
                        that.showRequest(msg);
                        that.sendRequest(msg, snAttr);

                        this.classList.add("selected");
                    }
                });
                responsePara.appendChild(button);
            }
            conversationDiv.appendChild(responsePara);
            conversationDiv.scrollTop = conversationDiv.scrollHeight;
        }

        /**
         * This function displays suggestion buttons to the user in two scenarios
         * When chat is initialized and when chat close button is clicked
         * The suggestionList parameter contains sessionattribute value- suggestion
         */
        this.showSuggestions = function (suggestionList) {
            let that = this;
            let conversationDiv = document.getElementById("oibot_conversation");
            let responsePara = document.createElement("P");
            responsePara.setAttribute("id", "oibot_suggestions");
            responsePara.className = "botSuggestionResponse";

            for (let data in suggestionList) {
                let suggestionbtn = document.createElement("span");
                suggestionbtn.innerHTML = suggestionList[data];
                suggestionbtn.className = "suggestionbutton";
                suggestionbtn.addEventListener("click", function () {
                    let msg = this.innerHTML;                        
                    document.getElementById("oibot_suggestions") && document.getElementById("oibot_suggestions").remove();
                    that.showRequest(msg);
                    that.sendRequest(msg);                    
                });
                responsePara.appendChild(suggestionbtn);
            }
            conversationDiv.appendChild(responsePara);
            conversationDiv.scrollTop = conversationDiv.scrollHeight;
        }

        /**
         * This function displays suggestion buttons within the chat
         * The suggestionList parameter contains sessionattribute value- suggestionsobj
         * Some example values are Pay now,See more mattress details..
         */
        this.showSuggestionsObj = function (suggestionList) {
            let that = this;
            let conversationDiv = document.getElementById("oibot_conversation");

            let responsePara = document.createElement("P");
            responsePara.setAttribute("id", "oibot_suggestions");
            responsePara.className = "botOptionResponse";


            let pi = document.createElement("span");
            pi.className = "roundedNav1 prev1";
            pi.id="p1";
            let piArrow = document.createElement("img");
            piArrow.style.width="20px";
            piArrow.src = this.assetsUrl+"suggestion-left.png";
            pi.appendChild(piArrow);
            let ni = document.createElement("span");
            ni.className = "roundedNav1 next1";
            ni.id="n1";

            let niArrow = document.createElement("img");
            niArrow.style.width="20px";
            niArrow.src = this.assetsUrl+"suggestion-right.png";

            ni.appendChild(niArrow);

            let ns=document.createElement("span");
            ns.className="botSuggestionResponse";
            ns.id="oibot_suggrow";
            // responsePara.appendChild(pi);
            // responsePara.appendChild(ni);
            window.onscroll = function () { window.scrollTo(0, 0); };

            /**
             *  This method assings Scroll action for scroll buttons present in the chat
             */
            pi.addEventListener("click",function(){
                document.getElementById("oibot_suggrow").scrollBy(-300,0);
            });
            ni.addEventListener("click",function(){
                document.getElementById("oibot_suggrow").scrollBy(300,0);
            });
            /**
             * This method assigns different attributes for the buttons available
             */
            for (let idx in suggestionList) {
                let suggestion = suggestionList[idx];
                let suggestionbtn = document.createElement("span");
                suggestionbtn.innerHTML = suggestion.name;
                suggestionbtn.className = "objectbutton";
                if(suggestion.id) {
                    suggestionbtn.setAttribute("value", suggestion.id);
                }
                if(suggestion.link) {
                    suggestionbtn.setAttribute("link", suggestion.link);
                }
                if(suggestion.isAjax) {
                    suggestionbtn.setAttribute("isAjax", suggestion.isAjax);
                }

                suggestionbtn.addEventListener("click",function(){
                    that.newfunction(suggestionbtn);
                });
                ns.appendChild(suggestionbtn);
            }

            responsePara.appendChild(ns);
            conversationDiv.appendChild(responsePara);
            if(ns.scrollWidth < 300) {
              /**
               * Scroll buttons are removed if the width is less than 300px
               */
                responsePara.removeChild(pi);
                responsePara.removeChild(ni);
            }
            conversationDiv.scrollTop = conversationDiv.scrollHeight;
        }

        /**
         * This function gets attribute value of the active slide
         * It is necessary in order to add the right product to the shopping cart
         */
        this.newfunction=function(ele){
            let that = this;
            delete that.sessionAttributes.isProduct;
            let msg = ele.innerHTML;
            let isSendRequest = false;

            let curValue = ele.getAttribute("value");
            let curLink = ele.getAttribute("link");
            let ajaxUrl = ele.getAttribute("isAjax");
            let snAttr = that.sessionAttributes;

            let curProductId = null;
            let curVariationId = null;
            let curProductUrl = null;
            let curProductName = null;
            let carouselEle = document.getElementById('oibot_suggestions');
            if(carouselEle) {
                carouselEle = carouselEle.previousSibling;
            }
            if(carouselEle && !carouselEle.classList.contains("mySlides")) {
                carouselEle = carouselEle.previousSibling;
            }
            if(carouselEle) {
                carouselEle = carouselEle.getElementsByClassName('carousel active');
            }
            if(carouselEle && carouselEle.length) {
                let titleEle = carouselEle[0].querySelector('.title');
                if(titleEle) {
                    curProductId = titleEle.getAttribute("value");
                    curVariationId = titleEle.getAttribute("variationid");
                    curProductUrl = titleEle.getAttribute("url");
                    curProductName = titleEle.innerHTML.split("<")[0];
                }
            }

            if (curValue) {
                snAttr.id = curValue;
            }

            /**
             * This method displays more details about the product by redirecting to the specific product's url
             */
            if(curLink == "{product}" && that.sessionAttributes.productUrl) {
                curLink = that.sessionAttributes.productUrl;
            }
            else if(curLink == "{product}" && curProductUrl) {
                curLink = curProductUrl;
                that.sessionAttributes.curProductId = curProductUrl;
                snAttr.id = curProductId;
                snAttr.productName = curProductName;
                snAttr.variationId = curVariationId;
            }
            /**
             * This method adds the product to the shopping cart in the appropriate site
             */
            if(ajaxUrl && that.sessionAttributes.productId) {

                let productJson = {"product_id":that.sessionAttributes.productId, "quantity":1};
                if(curVariationId) {
                    productJson["variation_id"] = curVariationId;
                }
                else if(that.sessionAttributes.variationId) {
                    productJson["variation_id"] = that.sessionAttributes.variationId;
                }
                let xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState === 4) {
                        that.sendRequest(msg, snAttr, callbackFn);
                    }
                }
                xmlhttp.open("POST", ajaxUrl);
                xmlhttp.setRequestHeader("Content-Type", "application/json");
                xmlhttp.send(JSON.stringify(productJson));
            }
            else if(ajaxUrl && !that.sessionAttributes.productId && curProductId) {
                let productJson = {"product_id":curProductId, "quantity":1};
                if(curVariationId) {
                    productJson["variation_id"] = curVariationId;
                }
                let xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState === 4) {
                        that.sendRequest(msg, snAttr, callbackFn);
                    }
                }
                xmlhttp.open("POST", ajaxUrl);
                xmlhttp.setRequestHeader("Content-Type", "application/json");
                xmlhttp.send(JSON.stringify(productJson));
                that.sessionAttributes.curProductId = curProductId;
                snAttr.id = curProductId;
                snAttr.productName = curProductName;
                snAttr.variationId = curVariationId;
            }
            else {
                isSendRequest = true;
            }

            document.getElementById("oibot_suggestions") && document.getElementById("oibot_suggestions").remove();

            /**
             * This function creates localstorage
             * It is responsible for continuing chat in new window - session maintenance
             * The current chat structure is cloned and rendered into another tab
             */
            let callbackFn = null;
            if (curLink) {
                callbackFn = function(isSuccess) {
                    let chatElement = document.getElementById("oibot_maindiv").cloneNode(true);
                    let chatStr = String(chatElement.innerHTML).replace(/\n|\r|\s{2,}/g, "");
                    let encodedStr = window.btoa(unescape(encodeURIComponent(chatStr)));
                    let sessionStr = String(JSON.stringify(that.sessionAttributes)).replace(/\n|\r|\s{2,}/g, "");
                    let encodedSession = window.btoa(unescape(encodeURIComponent(sessionStr)));
                    window.localStorage.setItem("history", encodedStr);
                    window.localStorage.setItem("isFromStorage", that.botUserId);
                    window.localStorage.setItem("session", encodedSession);

                    if(msg == "See More Mattress Details") {
                      /**
                       * Opens link in same tab
                       */
                        window.open(curLink, "_self");
                    }
                    else {
                        window.open(curLink, "_blank");
                    }
                }.bind(this);
            }
            that.showRequest(msg);
            if(isSendRequest) {
                that.sendRequest(msg, snAttr, callbackFn);
            }
        };

        /**
         * This function displays the bot response inside the chat window
         * The botResponse parameter contains all sessionattribute values
         * Sessionattributes are assigned to variables and passed on to different functions
         */
        this.showResponse = function (botResponse) {
            let that = this;
            document.getElementById("oibot_typingindicator") && document.getElementById("oibot_typingindicator").remove();
            document.getElementById("oibot_suggestions") && document.getElementById("oibot_suggestions").remove();
            let viewMore = document.getElementsByClassName("viewmore");
            if(viewMore.length) {
                viewMore[viewMore.length-1].disabled="true";
            }
            let messages = null;
            let skipIcon = false;
            if (botResponse && botResponse.sessionAttributes) {
                let sessionAttributes = botResponse.sessionAttributes;
                if (sessionAttributes.messages) {
                    messages = JSON.parse(sessionAttributes.messages);

                    if (messages) {
                        messages.forEach(function (message) {
                            if (message.isbefore) {
                                that.showPlainText(message.text, skipIcon);
                                skipIcon = true;
                            }
                        });
                    }
                }
            }

            if (botResponse && botResponse.message) {
                this.showPlainText(botResponse.message, skipIcon);
                skipIcon = true;
            }

            if (botResponse && botResponse.sessionAttributes) {
                let sessionAttributes = botResponse.sessionAttributes;
                if (messages) {
                    if (messages) {
                        messages.forEach(function (message) {
                            if (!message.isbefore) {
                                that.showPlainText(message.text, skipIcon);
                            }
                        });
                    }
                }
                if(sessionAttributes.slides) {
                    let slides = JSON.parse(sessionAttributes.slides);
                    this.showcarousel(slides);
                }
                else if (sessionAttributes.buttons) {
                    let buttons = JSON.parse(sessionAttributes.buttons);
                    this.showButtons(buttons);
                }
                if (sessionAttributes.suggestionsObj) {
                    let suggestionsObj = JSON.parse(sessionAttributes.suggestionsObj);
                    this.showSuggestionsObj(suggestionsObj);
                }
                else if (sessionAttributes.suggestions) {
                    let suggestions = JSON.parse(sessionAttributes.suggestions);
                    this.showSuggestions(suggestions);
                }
                
                if(sessionAttributes.showRating){
                    this.showRating();
                }
            }
        }

        /**
        * This function deletes values in localstorage when chat is closed
        * Session can't be maintained if localstorage is removed
        */
        this.removeStorage = function() {
            window.localStorage.removeItem("history");
            window.localStorage.removeItem("isFromStorage");
            window.localStorage.removeItem("session");            
        }

        /**
         * This function dispays the chat window when chat icon is clicked
         * Removes the popup messsage present earlier
         */
        this.onChatClick = function () {
            let layout = document.getElementsByClassName("layout")[0];
            let chaticon = document.getElementById("oibot_chaton");
            let popMessage = document.getElementById("oibot_popup");

            if(layout.style.display == "none" || layout.style.display == "") {
                chaticon.style.display = "none";
                popMessage.style.display = "none";
                layout.style.display = "block";

                let messages=
                  {
                    "suggestions":["Yes","Maybe later"]
                  }
                let sn = {};
                messages.messages = JSON.stringify(this.initialChatScript);
                messages.suggestions = JSON.stringify(messages.suggestions);
                sn.sessionAttributes = messages;
                this.showResponse(sn);
            }
        };

        /**
         * This function closes the chat window and calls the function to remove localstorage values
         * It also deletes the whole chat
         */
        this.onCloseClick = function () {
            this.removeStorage();
            if (!document.getElementsByClassName("oibot_userrequest").length) {
                this.onOkClick();
                return true;
            }

            let layout = document.getElementsByClassName("layout")[0];
            let messengerbody = document.getElementById("oibot_messenger_content");
            let chaticon = document.getElementById("oibot_chaton");
            let popMessage = document.getElementById("oibot_popup");

            let closechatmsg = document.getElementById("oibot_closechat");
            closechatmsg.style.display = "block";
            let userinputdiv = document.getElementById("oibot_userinputdiv");
            userinputdiv.style.display = "none";


            chaticon.style.display = "none";
            popMessage.style.display = "none";
            layout.style.display = "block";
            layout.style.minHeight = "";
            messengerbody.style.display = null;

        };

        /**
         * This function minimizes the chat window
         * Useful if chat window blocks some information present in the site
         */
        this.onMinimizeClick = function () {
            let layout = document.getElementsByClassName("layout")[0];
            let messengerbody = document.getElementById("oibot_messenger_content");
            let chaticon = document.getElementById("oibot_chaton");
            let popMessage = document.getElementById("oibot_popup");

            chaticon.style.display = "none";
            popMessage.style.display = "none";
            layout.style.minHeight = "60px";
            messengerbody.style.display = "none";

        };

        /**
         * This function maximizes the chat window when corresponding button is clicked
         * Allowing the user to continue the chat from where it was previously minimized
         */
        this.onMaximizeClick = function () {
            let layout = document.getElementsByClassName("layout")[0];
            let messengerbody = document.getElementById("oibot_messenger_content");
            let chaticon = document.getElementById("oibot_chaton");
            let popMessage = document.getElementById("oibot_popup");

            chaticon.style.display = "none";
            popMessage.style.display = "none";
            layout.style.minHeight = null;
            messengerbody.style.display = null;

        }

        /**
         * This function deletes the whole chat when the chat window is closed
         */
        this.removeallchildnode = function (parentnode) {
            let childNodes = document.getElementById(parentnode).childNodes;
            for (let i = childNodes.length - 1; i >= 0; i--) {
                let childNode = childNodes[i];
                childNode.remove()
            }

        }

        /**
         * This function is called when chat close button is clicked
         * It closes the chat window
         * Deletes the chat history and localstorage values
         */
        this.onOkClick = function () {

            let closechatmsg = document.getElementById("oibot_closechat");
            closechatmsg.style.display = "none";
            let userinputdiv = document.getElementById("oibot_userinputdiv");
            userinputdiv.style.display = "block";

            this.removeallchildnode("oibot_conversation");
            let layout = document.getElementsByClassName("layout")[0];
            let messengerbody = document.getElementById("oibot_messenger_content");
            let chaticon = document.getElementById("oibot_chaton");
            let popMessage = document.getElementById("oibot_popup");

            layout.style.display = "none";
            layout.style.minHeight = "";
            chaticon.style.display = "block";
            popMessage.style.display = "block";
            messengerbody.style.display = null;

            this.botUserId = "chatbot-JS" + new Date().getTime();
            this.sessionAttributes = {};

        }

        /**
         * This function is called when user clicks 'cancel' after clicking close button
         * The chat stays on
         */
        this.onCancelClick = function () {
            let closechatmsg = document.getElementById("oibot_closechat");
            closechatmsg.style.display = "none";
            let userinputdiv = document.getElementById("oibot_userinputdiv");
            userinputdiv.style.display = "block";
        }

        /**
         * This function is responsible for displaying images in each slides
         * The slidelist parameter contains sessionattribute values - slide
         */
        this.showcarousel = function (slidelist) {
            let that = this;
            this.slideIndex.push(1);
            let curIdx = document.getElementsByClassName("botSlides").length;
            let conversationDiv = document.getElementById("oibot_conversation");
            let trating=document.createElement("p");
            trating.id="tr";
            trating.className="rating";
            let ax=document.createTextNode("Sleep Expert Rating From Goodbed.com");
            trating.appendChild(ax);
            if(slidelist.length) {
                conversationDiv.appendChild(trating);
            }

            let responsePara = document.createElement("P");
            responsePara.setAttribute("id", this.slideDivId+curIdx);
            responsePara.className = "botSlides mySlides fadeSlide";

            /**
             * This method is used to display single slide
             * It's attributes are set inside the method
             */
            if(slidelist.length > 1) {
                let firstSlideDiv = document.createElement("SPAN");
                let firstSlide = slidelist[0];
                firstSlideDiv.id = "single_"+curIdx;

                let slide = document.createElement("span");
                slide.className = "carousel1 active";
                let img = document.createElement("img");
                img.src = firstSlide.images[0] || firstSlide.image;

                // let innerHTML = firstSlide.name +"<br> Price: $" +firstSlide.price;
                let innerHTML = firstSlide.name;
                let span = document.createElement("span");
                span.innerHTML = innerHTML;
                span.className = "title";
                if(firstSlide.id) {
                    span.setAttribute("value", firstSlide.id);
                }
                if(firstSlide.permalink) {
                    span.setAttribute("url", firstSlide.permalink);
                }
                if(firstSlide.variation_id) {
                    span.setAttribute("variationid", firstSlide.variation_id);
                }

                let view=document.createElement("button");
                view.className="suggestionbutton viewmore objectbutton";
                /**
                 * To display multiple slides
                 */
                view.addEventListener("click",function(){
                    document.getElementById("single_"+curIdx).style.display="none";

                    document.getElementById(that.slideDivId+curIdx).style.display="inline-grid";

                    let curSlideParent = this.closest(".botSlides");
                    curSlideParent.nextSibling.style.display="block";

                    let slidess = curSlideParent.getElementsByClassName("carousel");
                    for(let sIdx=0; sIdx<slidess.length; sIdx++) {
                        slidess[sIdx].style.display = "block";
                    }

                    conversationDiv.scrollTop = conversationDiv.scrollHeight;
                });

                let viewtext=document.createTextNode("View More Products");
                view.appendChild(viewtext);

                let prrat=document.createElement("span");
                prrat.className="circularchart";
                let html=document.createTextNode(firstSlide.rating+"%");
                prrat.appendChild(html);
                slide.appendChild(img);
                slide.appendChild(span);
                slide.appendChild(prrat);

                slide.addEventListener("click", function() {
                    if(this.parentNode.classList.contains("product")) {
                        return false;
                    }
                    if(!this.classList.contains("active")) {
                        that.showSlides(parseInt(this.getAttribute("slide"))+1, curIdx);
                    }
                    let product = this.childNodes[1];
                    let msg = product.innerHTML.split("<")[0];
                    let snAttr = that.sessionAttributes;
                    if (product.getAttribute("value")) {
                        snAttr.id = product.getAttribute("value");
                        snAttr.productName = msg;
                    }
                    if(product.getAttribute("variationid")) {
                        snAttr.variationId = product.getAttribute("variationid");
                    }
                    document.getElementById(that.slideDivId+curIdx).classList.add("disabled");
                    that.showRequest(msg);
                    that.sendRequest(msg, snAttr);
                });

                firstSlideDiv.appendChild(slide);
                firstSlideDiv.appendChild(view);
                responsePara.appendChild(firstSlideDiv);
            }

            /**
             * To display a carousel of slides
             */
            for (let idx in slidelist) {
                let slide = document.createElement("span");
                slide.setAttribute("slide", idx);
                slide.className = "carousel fadeSlide";
                if(!that.sessionAttributes.productId) {
                    slide.style.display = "none";
                }
                let img = document.createElement("img");
                img.src = slidelist[idx].images[0] || slidelist[idx].image;
                let span = document.createElement("span");
                let innerHTML = slidelist[idx].name ;
                // + "<br> Price: $"+ slidelist[idx].price;
                if(slidelist[idx].warranty) {
                    responsePara.style.display="none";
                    innerHTML += "<br> Warranty: "+slidelist[idx].warranty;
                }
                if(slidelist[idx].description) {
                    let desc = slidelist[idx].description;
                    if(desc.length > 80) {
                        desc = desc.slice(0, 80) + "...";
                    }
                    innerHTML += desc;
                }

                span.innerHTML = innerHTML;
                span.className = "title";
                if(slidelist[idx].id) {
                    span.setAttribute("value", slidelist[idx].id);
                }
                if(slidelist[idx].permalink) {
                    span.setAttribute("url", slidelist[idx].permalink);
                }
                if(slidelist[idx].variation_id) {
                    span.setAttribute("variationid", slidelist[idx].variation_id);
                }

                let prrat=document.createElement("span");
                prrat.className="circularchart";

                let html = document.createTextNode(slidelist[idx].rating+"%");
                prrat.appendChild(html);

                slide.appendChild(img);
                slide.appendChild(span);
                slide.appendChild(prrat);

                slide.addEventListener("click", function() {
                    if(this.parentNode.classList.contains("product")) {
                        return false;
                    }
                    if(!this.classList.contains("active")) {
                        that.showSlides(parseInt(this.getAttribute("slide"))+1, curIdx);
                    }
                    let product = this.childNodes[1];
                    let msg = product.innerHTML.split("<")[0];
                    let snAttr = that.sessionAttributes;
                    if (product.getAttribute("value")) {
                        snAttr.id = product.getAttribute("value");
                        snAttr.productName = msg;
                    }
                    if(product.getAttribute("variationid")) {
                        snAttr.variationId = product.getAttribute("variationid");
                    }
                    document.getElementById(that.slideDivId+curIdx).classList.add("disabled");
                    that.showRequest(msg);
                    that.sendRequest(msg, snAttr);
                });

                responsePara.appendChild(slide);
                conversationDiv.appendChild(responsePara);
            }

            /**
             * This method adds arrow key events to change active slides
             */
            document.onkeydown = function(e) {
                if(e.keyCode==39)
                /** ASCII value for right arrow*/
                    that.plusSlides(1,curIdx);
                else if(e.keyCode==37)
                /** ASCII value for left arrow*/
                    that.plusSlides(-1,curIdx);
            }

            conversationDiv.appendChild(responsePara);
            /**
             * This method adds navigation buttons under the carousel
             */
            if(slidelist.length > 1) {
                let pi = document.createElement("span");
                pi.className = "roundedNav prev";
                let piArrow = document.createElement("img");
                piArrow.src = this.assetsUrl+"slider-left.png";
                piArrow.style.width="10px";
                pi.appendChild(piArrow);
                let ni = document.createElement("span");
                ni.className = "roundedNav next";
                let niArrow = document.createElement("img");
                niArrow.src = this.assetsUrl+"slider-right.png";
                niArrow.style.width="10px";
                ni.appendChild(niArrow);

                pi.addEventListener("click", function () {
                    that.plusSlides(-1, curIdx);
                });
                ni.addEventListener("click", function () {
                    that.plusSlides(1, curIdx);
                });

                let responsePara1 = document.createElement("P");
                responsePara1.className = "botSlidesNav";
                responsePara1.appendChild(pi);
                responsePara1.appendChild(ni);
                responsePara1.style.display = "none";
                conversationDiv.appendChild(responsePara1);
                this.sessionAttributes.isProduct = true;
            }
            else if(that.sessionAttributes.productId) {
                document.getElementById(this.slideDivId+curIdx).classList.add("product");
            }

            /**
             * This line of code displays the currently active slide
             */
            document.getElementById(this.slideDivId+curIdx).getElementsByClassName("carousel") &&
                (document.getElementById(this.slideDivId+curIdx).getElementsByClassName("carousel")[0].classList.add("active"));


            conversationDiv.scrollTop = conversationDiv.scrollHeight;
        }

        /**
         * This function passes currently active slide index value
         * The two parameters are incremental value and slideindex number
         */
        this.plusSlides = function (n, sIdx) {
            let curSlideParent = document.getElementById(this.slideDivId+sIdx);
            if(curSlideParent.classList.contains("disabled")) {
                return false;
            }
            this.showSlides(this.slideIndex[sIdx] += n, sIdx);
        }
        /**
         * This function sets active property to the current slide and allows to switch slides
         * The two parameters are incremental value and slideindex number
         */
        this.showSlides = function (n, sIdx) {
            let curSlideParent = document.getElementById(this.slideDivId+sIdx);
            let slidess = curSlideParent.getElementsByClassName("carousel");

            this.slideIndex[sIdx] = n;
            if (n > slidess.length) { this.slideIndex[sIdx] = 1 }
            if (n < 1) { this.slideIndex[sIdx] = slidess.length }
            for (let i = 0; i < slidess.length; i++) {
                slidess[i].classList.remove("active");
            }

            slidess[this.slideIndex[sIdx] - 1].classList.add("active");
            if(this.slideIndex[sIdx] > 1) {
                curSlideParent.scrollLeft = 100;
                curSlideParent.scrollLeft += (this.slideIndex[sIdx]-2)*170;
            }
            else {
                curSlideParent.scrollLeft = 0;
            }
           
        }

        /**
         * This function creates a feedback form for the user to rate the chat on a scale of 1-5
         * A greeting text is displayed once the user rates the chat experience
         */
        this.showRating = function(){
            let that=this;
            let starsAvail = document.getElementsByClassName("stars").length;
            let conversationDiv = document.getElementById("oibot_conversation");
            let div=document.createElement("div");
            div.id="stardiv";
            div.className="stars";
            let form=document.createElement("form");
            form.id="starform-"+starsAvail;
            let n=5;
            let a=[];
            let b=[];
            for(let i=1;i<=5;i++,n--){
                a[i]=document.createElement("input");
                a[i].name="rate";
                a[i].type="radio";
                a[i].id="star-"+starsAvail+"-"+n;
                a[i].className="star star-"+starsAvail+"-"+n;
                a[i].addEventListener("change", function(){
                  if(!this.getAttribute("disabled")) {
                    that.sendRating(this.id.split("-")[2]);
                  }
                });
                form.appendChild(a[i]);

                b[i]=document.createElement("label");
                b[i].htmlFor="star-"+starsAvail+"-"+n;
                b[i].className="star star-"+starsAvail+"-"+n;
                b[i].addEventListener("click", function(){
                    if(!this.getAttribute("disabled")) {
                        let starsAvail = document.getElementsByClassName("stars").length;
                        starsAvail--;
                        document.getElementsByClassName("ng-"+starsAvail)[0].style.display="none";
                        document.getElementsByClassName("greet-"+starsAvail)[0].style.display="block";
                        form.style.pointerEvents = "none";
                        let starLabels1 = document.querySelectorAll("label.star:not([disabled])");
                        if(starLabels1 && starLabels1.length) {
                            for(let sIdx1=0; sIdx1<starLabels1.length; sIdx1++) {
                                starLabels1[sIdx1].setAttribute('disabled', '');
                            }
                        }
                    }
                });
                form.appendChild(b[i]);
            }

            let html = document.createTextNode("How do you rate this chat experience?");
            let p=document.createElement("p");
            p.className="hail ng-"+starsAvail;
            p.appendChild(html);

            let html2=document.createTextNode("Thank you, your feedback is noted. Have a good day.");
            let p2=document.createElement("p");
            p2.style.fontSize="14px";
            p2.className="hail greet-"+starsAvail;
            p2.appendChild(html2);
            p2.style.display="none";

            div.appendChild(p);
            div.appendChild(form);
            div.appendChild(p2);
            conversationDiv.appendChild(div);
            conversationDiv.scrollTop = conversationDiv.scrollHeight;
        }

        /**
         * This function is used to send the rating given by user
         * as hidden request
         */
        this.sendRating=function(rating){
            let that=this;
            let snAttr = that.sessionAttributes;
            snAttr.israted=rating;
            let msg="Rating is stored";
            that.sendRequest(msg, snAttr);
        }

        /**
         * This function is used to toggle chat mode between light and dark
         * Provides different User experience
         */
        this.darkmode=function(){
            let dm = document.getElementById("oibot_conversation");
            dm.classList.toggle("dark-mode");
        }
        /**
         * This function enables the browser to track location of the user
         */
        this.getLocation=function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position){
                    let latitude=position.coords.latitude;
                    let longitude=position.coords.longitude;
                });
            }
        }

    }
    var instance;
    return {
        getInstance: function(){
            /*
            * checks if instance is available
            */
            if (!instance) {
                instance = new BotUI();
                delete instance.constructor;
            }
            return instance;
        }
    };
})();

/**
 * The following lines of code makes a function call which runs the entire program
 * All specified operations are functional and can be deployed onto the website as a chatwidget
 */
const botUI = new botFactory.getInstance();
botUI.loadUIdesign();
