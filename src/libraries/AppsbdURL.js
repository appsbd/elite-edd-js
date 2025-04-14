import AppsbdUtls from "@/libraries/AppsbdUtls";
const apbd_wp_option= window.apbd_eledd;

const apssbd_admin_url= {
    get_plugin: function (action) {
        let actionStr = apbd_wp_option.base_slug + '-' + action;
        actionStr = actionStr.toLowerCase().replace("_", "-");
        return apbd_wp_option.ajax_url + '&action=' + actionStr;
    },
    get_module_url: function (module_id, action) {
        let actionStr = apbd_wp_option.base_slug  + '-m-' + module_id + '-' + action;
        actionStr = actionStr.toLowerCase().replace(/_/g, "-");
        return apbd_wp_option.ajax_url + '&action=' + actionStr;
    },
    get_ajax_url: function (action) {
        return apbd_wp_option.ajax_url + '&action=' + action;
    }
}

const AppsbdURL = {
    install(Vue,translate) {
        Vue.config.globalProperties.$appsbdURL = apssbd_admin_url;
    },
}
export {apssbd_admin_url};
export default AppsbdURL;