<template>
  <module-loader v-if="is_loading" />
  <div v-else class="row g-3">
    <div class="col-sm-7">
      <div class="card apbd-theme-card m-3 " style="margin-right: unset !important;">
        <div class="card-header">
          <h6>EDD Elite Licenser Settings</h6>
        </div>
        <SettingsForm  @invalid="$emit('loading',false)" ref="gs-form"  :on-submit="storeSettings"
                              class="needs-validation ">
        <div class="card-body p-3">

            <div class="row mb-3">
              <label for="license_generate_event" class="col-sm-4 col-form">License Generate Event</label>
              <div class="col-sm-8">
                <Field  class="form-select form-select-sm" name="license_generate_event" label="License Generate Event" as="select" rules="required" id="license_generate_event" v-model="settings.license_generate_event">
                  <option value='' disabled>Select</option>
                  <option :value="item.val" v-for="(item,s_key) in this.create_status">{{ item.label }}</option>

                </Field>
                <ErrorMessage name="license_generate_event" class="apbd-v-error"/>
              </div>
            </div>
            <div class="row mb-3">
              <label class="col-sm-4 col-form" >
                <translate :translate-params="{licenser:'Elite Licenser'}">%{licenser} Installed on</translate>
              </label>
              <div class="col-sm-8">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="installed_type" value="R" v-model="settings.installed_type" id="installed_type1" checked>
                  <label class="form-check-label" for="installed_type1">
                    Remote Server [Recommended]
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="installed_type" value="A" v-model="settings.installed_type" :disabled="settings?.has_el_self!='Y'" id="installed_type2" >
                  <label class="form-check-label" for="installed_type2">
                    <translate>In this WordPress</translate>
                    <span v-if="settings?.has_el_self!='Y'"> [<translate>Not Installed or Activated</translate>]</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="row mb-3" v-if="settings.installed_type!='A'">
              <label for="api_end_point" class="col-sm-4 col-form" v-translate>API End Point</label>
              <div class="col-sm-8">
                <Field type="text" class="form-control form-control-sm"  placeholder="Elite Licenser API End Point"  name="api_end_point" label="Api end point"  rules="required" id="api_end_point" v-model="settings.api_end_point" />
                <ErrorMessage name="api_end_point" class="apbd-v-error"/>
              </div>
            </div>
            <div class="row " v-if="settings.installed_type!='A'">
              <label for="api_key" class="col-sm-4 col-form" v-translate>API Key</label>
              <div class="col-sm-8">
                <Field type="text" class="form-control form-control-sm " placeholder="Elite Licenser API Key" name="api_key" label="Api key"  rules="required" id="api_key" v-model="settings.api_key" />
                  <ErrorMessage name="api_key" class="apbd-v-error"/>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-12">
                <hr>
              </div>
              <div class="col-sm-6 ">
                <h6 v-translate>Disable the license key when the order status is set to:</h6>
              </div>
            </div>
          <div>
            <field label="Refund Status" rules="required" v-model="settings.refund_status" class="form-select" name="refund_status">
              <image-radio-input type="checkbox" :is-inline="true" margin="0 10px 0 0"   :options="option_refund_status" name="refund_status"  v-model="settings.refund_status" />
            </field>
            <ErrorMessage name="refund_status" class="apbd-v-error"/>
            <small class="d-flex  help-text text-muted text-italic ">
              Select these statuses when you want to deactivate the license key in Elite Licenser.</small>
            </div>
        </div>
          <div class="card-footer d-flex justify-content-end">
            <button type="submit" class="btn btn-sm btn-success">Save</button>
          </div>
        </SettingsForm>
      </div>
    </div>
    <div class="col-sm-5">
       <div class="card apbd-theme-card m-3" style="margin-left: unset !important;">
         <div class="card-header">
           <h6>About Elite Licenser</h6>
         </div>
         <div class="card-body p-3">
           <div class="mb-3">
             <small>
               Elite Licenser is a WordPress plugin for any types of product licensing. It also manages product updates, auto generates license code, built in Envato licensing verification system, full license control and more. It has full set of API, so you can handle it by other applications as well. One app handles license of all your products. You can handle any language (PHP, .Net, Java, Android, etc.). Also you can add licensing to more than one WordPress plugin or theme and it can be installed on same WordPress.
             </small>
           </div>

           <div>
             <a href="https://elitelicenser.com/" class="btn btn-success" target="_blank">View Details</a>
           </div>
         </div>
       </div>
      <div v-if="false" class="card apbd-theme-card m-3" style="margin-left: unset !important;">
        <div class="card-header">
          <h6>More Addons</h6>
        </div>
        <div class="card-body p-3">
          <div class="row row-cols-1 row-cols-md-3">
            <div class="col">
              <div class="card h-100">
                <img src="https://appsbd.com/wp-content/uploads/2021/11/Frame-1-1.svg" class="card-img-top" alt="...">
                <div class="card-body h-100">
                  <a href="https://appsbd.com/products/best-support-system/" class=" d-flex  flex-column text-decoration-none">
                    Support system
                  </a>
                </div>
              </div>

          </div>
            <div class="col">
              <div class="card h-100">
                <div class="card-body h-100">
                  <a href="https://elitelicenser.com/member-area/" class="text-decoration-none d-flex  flex-column" title="">
                    <img src="https://ps.w.org/elite-licenser-lite/assets/icon-128x128.png?rev=2269605" class="img-thumbnail  p-2 shadow-sm mb-2"   alt="">
                    Elite Member Area
                  </a>
                </div>
              </div>

            </div>
            <div class="col">
              <div class="card h-100">
                <div class="card-body h-100">
                  <a href="https://elitelicenser.com/" class="text-decoration-none d-flex  flex-column">
                    <img src="https://ps.w.org/woo-elite-licenser-addon/assets/icon-256x256.png?rev=2172062" class="img-thumbnail  p-2 shadow-sm mb-2 " alt="">
                    Elite Licenser
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {Form, Field, ErrorMessage} from "vee-validate";
import ModuleLoader from "@/components/ModuleLoader";
import SettingsForm from "@/components/SettingsForm";
import {mapStores} from 'pinia';
import {useSettingStore} from "@/modules/settings/SettingStore";
import ImageRadioInput from "@/components/ImageRadioInput.vue";
export default {
name: "AllSettings",
  components:{ImageRadioInput, ModuleLoader, Form,Field,ErrorMessage,SettingsForm},
  data()
  {
    return{
      is_loading:false,
      settings:{
        license_generate_event:'',
        installed_type:'',
        api_end_point:'',
        order_refund:'N',
        order_cancel:'N',
        order_failed:'N',
        refund_status:[]
      },
     positve_events:[
       'pending',
       'processing',
       'complete'
     ],
     negative_events:[
        'partially_refunded',
        'revoked',
        'abandoned',
        'on_hold',
        'failed'
      ]
    }
  },
  mounted() {
    this.getSettings();
  },
  computed:{
     ...mapStores(useSettingStore),
    create_status() {
      try {
        return this.settings.edd_status.filter(
            (item) => !this.negative_events.includes(item.val)
        );
      } catch (e) {
        console.log(e.message);
        return [];
      }
    },
    option_refund_status() {
      try {
        return this.settings.edd_status.filter(
            (item) => !this.positve_events.includes(item.val)
        );
      } catch (e) {
        return [];
      }
    }
  },
  methods:{
    async getSettings() {
      this.is_loading = true;
      let resp = await this.settingStore.loadSettings();
      if (resp) {
        this.settings = {...resp};

      }
      this.is_loading=false;
    },
    async storeSettings()
    {
      try {
        let response = await this.settingStore.storeSettings(this.settings);
        console.log(response);
        if (response?.status) {
          this.$appsbdUtls.ShowServerResponseNotification(response.msg, 5000);
        }

      }catch (e)
      {
        console.log(e)
      }
      this.$emit('loading', false);
    }
  }

}
</script>

<style scoped>

</style>