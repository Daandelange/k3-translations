
// Utility for providing dynamic variables to k-translations
export default {

  data: function() {
    return {
      isLoading: false,
      replaceKirbyLangs: true,
      translationStatuses: [], // Array of translation statuses
      translationUrls: {}, // Object of translation urls
      deletable: false,
      revertable: false,
      isInHeader: false,
      showLoader: false,
      compactMode: false,
      showEditLanguage: true,
      label: null,
      contentID: null,
    };
  },
  async created(){
  //async mounted() { // Needs to wait for mounted to inherit props before requesting
    await this.reload();
  },
  computed: {
    apiUrl(){
      let url = this.$view?.props?.model?.link;
      return  (url && url!='') ? (''+url+'/translations-info') : 'plugin-translations/load-header';
    },
  },
  methods: {
    reload() { // Note: cannot be async with mixins...
      this.isLoading = true;
      let name = this.name;
      let me = this;
      const response = this.load().then(function(response){
        me.onLoad(response);
      }).catch((error)=>{
        // todo : Handle request failed.
        console.log('ERROR! on loading translations =', error, ', component = ',me);
      }).finally( () => {
        this.isLoading = false;
      });
    },
    onLoad(response){
      // Parse options
      if( response.options?.header?.replaceKirbyLanguages >= 0 ){
        this.replaceKirbyLangs = response.options.header.replaceKirbyLanguages;
      }
      if( response.options?.header?.deletable != null ){
        this.deletable = response.options.header.deletable;
      }
      if( response.options?.header?.revertable != null ){
        this.revertable = response.options.header.revertable;
      }
      if( response.options?.header?.compactMode != null ){
        this.compactMode = response.options.header.compactMode;
      }
      if( response.options?.header?.showEditLanguage != null ){
        this.showEditLanguage = response.options.header.showEditLanguage;
      }

      // Grab more data
      if( response.translations != null ){
        this.translationStatuses = response.translations; // Not reactive with arrays/objects
        //this.$set(this, 'translationStatuses', response.translations); // Reactive ?
      }
      if( response.id != null ){
        this.contentID = response.id;
      }
      if( response.previewUrls != null ){
        this.translationUrls = response.previewUrls;
      }

      // Translation Section / Fields can be over-ridden by the blueprint prop
      if( response.deletable != null ){ // Parses options from section / field response
        this.deletable = response.deletable;
      }
      if( response.revertable != null ){ // Parses options from section / field response
        this.revertable = response.revertable;
      }
      if( response.compactMode != null ){ // Parses options from section / field response
        this.compactMode = response.compactMode;
      }
      if( response.label != null ){ // Parses options from section / field response
        this.label = response.label;
      }
      if( response.showEditLanguage ){
        this.showEditLanguage = response.showEditLanguage;
      }
    },
    // Load fallback, hopefully replaced by component
//     load() {
//       return this.$api.get(this.apiUrl);
//     },

    // A bit tricky helper for manually binding child props to parent data 
    getTranslationsProviderPropsBinding(){
      return {
        translationStatuses:  this.translationStatuses,
        isInHeader:           this.isInHeader,
        showLoader:           this.showLoader,
        isLoading:            this.isLoading,
        replaceKirbyLangs:    this.replaceKirbyLangs,
        deletable:            this.deletable,
        revertable:           this.revertable,
        label:                this.label,
        translationUrls:      this.translationUrls,
        showEditLanguage:     this.showEditLanguage,
        compactMode:          this.compactMode,
      };
    },
  }
};
