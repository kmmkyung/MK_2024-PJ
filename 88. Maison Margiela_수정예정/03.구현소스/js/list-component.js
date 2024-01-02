import store from "./listData-women.js";
import { hcode, core } from "./core.js";
console.log("list.js 로딩완료:");
//____________________________________________________________________________
core();
let menuCode = `
    <ul class="nav-L__list">
    ${hcode}
    </ul>`;
Vue.component("menu-comp", {
    template: menuCode,
    methods: {
        myFn(pm) {
            console.log("찍어라!", pm);
            // 스토어 변수 업데이트
            store.state.cat = pm;
            // console.log("변경!", store.state.cat);
        },
    },
    mounted(){
    }
});




Vue.component("title-comp", {
    template: `
    <div class="main-header">
        <h2 class="main-title">{{$store.state.cat}}</h2>
    </div>
    `,
});


Vue.component("listDetail-comp",{
    template:`
    <div>
        <section id="sublist" class="-hidden">
            <div class="sublist-all">
                <div class="sublist-con__imgbox">
                    <div class="sublist-con__img-sub">
                        <ul class="sublist-con__img-sub-ul">
                            <li class="sublist-con__img-sub-ul-li">
                                <img class="-click" src="./imges/RTW/women/sublist-con/RTW-women_sub-0101.jpg" alt="Utility Cotton Trench Coat">
                            </li>
                            <li class="sublist-con__img-sub-ul-li">
                                <img class="-click" src="./imges/RTW/women/sublist-con/RTW-women_sub-0102.jpg" alt="Utility Cotton Trench Coat">
                            </li>
                            <li class="sublist-con__img-sub-ul-li">
                                <img class="-click" src="./imges/RTW/women/sublist-con/RTW-women_sub-0103.jpg" alt="Utility Cotton Trench Coat">
                            </li>
                            <li class="sublist-con__img-sub-ul-li">
                                <img class="-click" src="./imges/RTW/women/sublist-con/RTW-women_sub-0104.jpg" alt="Utility Cotton Trench Coat">
                            </li>
                            <li class="sublist-con__img-sub-ul-li">
                                <img class="-click" src="./imges/RTW/women/sublist-con/RTW-women_sub-0105.jpg" alt="Utility Cotton Trench Coat">
                            </li>
                        </ul>
                    </div>
                    <div class="sublist-con__img-main">
                        <img src="./imges/RTW/women/women01.jpg" alt="Utility Cotton Trench Coat">
                    </div>
                </div>
                <div class="sublist-con__content">
                    <div class="list-con__content-title">
                        <h5>COATS & JACKETS</h5>
                        <h3>Utility cotton trench coat</h3>
                    </div>
                    <div class="sublist-con__content-color">
                        <label for="rid">
                            <input type="radio" name="rid" class="-click -center">
                        </label>
                        <span>banana</span>
                    </div>
                    <div class="sublist-con__content-size">
                        <select class="sublist-con__content-size-button" name="select">
                            <option value="size">Size</option>
                            <option value="init">36</option>
                            <option value="init">38</option>
                            <option value="init">40</option>
                            <option value="init">42</option>
                            <option value="init">44</option>
                            <option value="init">46</option>
                        </select>
                        <span>Size Guide</span>
                    </div>
                    <div class="sublist-con__content-text">
                        <p>The trench coat in utility cotton features a minimal design with a buttoned collar and back vent. The buttons are hidden for a clean aspect. Maison Margiela's signature, the four stitches, appear at the back; the opposite of a label.</p>
                    </div>
                </div>
            </div>
            <div class="sublist_close">
                <i class="fa-solid fa-xmark"></i>
            </div>
        </section>
        <div class="blur_box -blur_show -hidden"></div>
    </div>
    `,
})

Vue.component("list-comp", {
    template: `
    <div class="list-all">
        <ul class="list-con">
            <li v-for="(v,i) in $store.state[$store.state.cat]">
                <div class="none_hover">
                    <img class="list-con__img imgMove" v-bind:src="'./imges/'+$store.state.cat+'/women/'+v.img">
                    <div class="list-con__title">
                        <h3>{{v.name}}</h3>
                        <i class="fa-regular fa-bookmark"></i>
                    </div>
                </div>
                <div class="hover">
                    <img class="list-con__img2 imgMove" v-bind:src="'./imges/'+$store.state.cat+'/women/'+v.img2">
                    <div class="list-con__title2">
                        <h3>{{v.name2}}</h3>
                    </div>
                </div>
            </li> 
        </ul>
    </div>
    `,
});


Vue.component("footer-comp",{
    template:`
    <div class="footer-con">
                <article class="footer-latter">
                    <h5>RECEIVE THE NEWSLETTER</h5>
                    <p>Maison Margiela의 새로운 컬렉션, 독점 콘텐츠 및 이벤트에 대한 업데이트를 받으십시오.</p>
                    <form>
                        <input type="email" required="required" class="footer-email">
                        <label for="footer-email">Email address</label>
                    </form>
                </article>
                <article class="footer-links">
                    <!-- 1. Country/Region -->
                    <div class="footer-links__box">
                        <button class="footer-links__btn -ghost -blur">
                            Country/Region
                        </button>
                    </div>
                    <!-- 2. Boutiques -->
                    <div class="footer-links__box">
                        <button class="footer-links__btn -ghost -blur">Boutiques</button>
                    </div>
                    <!-- 3. Client Care -->
                    <div>
                        <div class="footer-links__box">
                            <button class="footer-links__btn -ghost -blur">Client Care
                                <i class="fa-solid fa-chevron-down"></i>
                            </button>
                            <div class="aaa">
                                <ul class="footer-links__list">
                                    <li><a href="#" class="-blur">CONTACT US</a></li>
                                    <li><a href="#" class="-blur">FAQS</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- 4. Follow us -->
                    <div>
                        <div class="footer-links__box">
                            <button class="footer-links__btn -ghost -blur">Follow us
                                <i class="fa-solid fa-chevron-down"></i>
                            </button>
                            <div class="aaa">
                                <ul class="footer-links__list">
                                    <li><a href="#" class="-blur">INSTAGRAM</a></li>
                                    <li><a href="#"class="-blur">TWITTER</a></li>
                                    <li><a href="#"class="-blur">YOUTUBE</a></li>
                                    <li><a href="#"class="-blur">WECHAT</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- 5. Legal Area -->
                    <div>
                        <div class="footer-links__box">
                            <button class="footer-links__btn -ghost -blur">Legal Area
                                <i class="fa-solid fa-chevron-down"></i>
                            </button>
                            <div class="aaa">
                                <ul class="footer-links__list">
                                    <li><a href="#" class="-blur">terms</a></li>
                                    <li><a href="#" class="-blur">privacy</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- 6. Accessibility -->
                    <div>
                        <div class="footer-links__box">
                            <button class="footer-links__btn -ghost -blur">
                                Accessibility
                                <i class="fa-solid fa-chevron-down"></i>
                            </button>
                            <div class="aaa">
                                <ul class="footer-links__list">
                                    <li><a href="#" class="-blur">statement</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- 7. Need assistance? -->
                    <div class="footer-links__box">
                        <button class="footer-links__btn -ghost -blur">Need assistance?</button>
                    </div>
                </article>
                <article class="footer-text">
                    <p>Maison Margiela is part of OTB</p>
                    <p>Maison Margiela supports the OTB Foundation</p>
                    <p>Careers</p>
                    <p>Copyright © 2023 - v3.5.11</p>
                </article>
            </div>
    `,
});







new Vue({
    el: ".mcont",
    store, // 스토어등록!!!
    mounted() {
        core();
        // console.log(hcode)
    },
});


//____________________________________________________________________________
