import Swiper from "swiper";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";

export default function () {
    Swiper.use([Navigation, Pagination, EffectFade, Autoplay]);
}
