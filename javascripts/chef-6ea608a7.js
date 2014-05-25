(function(){var t,e=function(t,e){return function(){return t.apply(e,arguments)}};t=function(){function t(t,n,i){var o;this.form=t,this.codeOut=n,this.oldPgkernel=i,this._appCacheUpdated=e(this._appCacheUpdated,this),this._initAppcache=e(this._initAppcache,this),this._notSizeValues=e(this._notSizeValues,this),this._formatedValue=e(this._formatedValue,this),this._hightlightCode=e(this._hightlightCode,this),this._kernelSettings=e(this._kernelSettings,this),this._postgresSettings=e(this._postgresSettings,this),this._generateConfig=e(this._generateConfig,this),this._mobileNextButton=e(this._mobileNextButton,this),this._generateConfigForm=e(this._generateConfigForm,this),this.form.submit(this._generateConfigForm),Modernizr.touch&&($("#pgtTotalMemValue").on("keydown",this._mobileNextButton),$("#pgtConnectionsValue").on("keydown",this._mobileNextButton)),this._initAppcache(),this.constSize={KB:1024,MB:1048576,GB:1073741824,TB:1099511627776,KB_PER_GB:1048576,KB_PER_MB:1024},this.conByType={web:200,oltp:300,dw:20,desktop:5,mixed:100};try{$(document).foundation()}catch(r){o=r,null!=console.warn&&console.warn("Too old browser :(")}}return t.prototype._generateConfigForm=function(t){return t.preventDefault(),$("span.clearHintForUser").remove(),this._generateConfig()},t.prototype._mobileNextButton=function(t){return null!=t.which&&9===t.which?this.form.submit():void 0},t.prototype._generateConfig=function(){var t,e;return this.osType=$("#pgtOsTypeValue").val(),-1===jQuery.inArray(this.osType,["linux","windows"])&&(this.osType="linux"),this.dbType=$("#pgtDbTypeValue").val(),null==this.conByType[this.dbType]&&(this.dbType="mixed",$("#pgtDbTypeValue").val(this.dbType)),t=this.constSize[$("#pgtTotalMemMeasValue").val()],null==t&&(t=this.constSize.GB),e=parseInt($("#pgtTotalMemValue").val(),10),(1>e||e>9999)&&(e=2,$("#pgtTotalMemValue").val(e)),this.totalMemory=parseInt(e,10)*t,this._postgresSettings(),this._kernelSettings(),this._hightlightCode()},t.prototype._postgresSettings=function(){var t,e,n,i,o,r,s,a;return e={max_connections:this.conByType[this.dbType]},$("#pgtConnectionsValue").val().length&&(e.max_connections=parseInt($("#pgtConnectionsValue").val(),10)),(e.max_connections<1||e.max_connections>9999)&&(e.max_connections=this.conByType[this.dbType]),o=this.totalMemory/this.constSize.KB,n="",this.totalMemory>=256*this.constSize.MB?(e.shared_buffers={web:Math.floor(o/4),oltp:Math.floor(o/4),dw:Math.floor(o/4),desktop:Math.floor(o/16),mixed:Math.floor(o/4)}[this.dbType],"windows"===this.osType&&e.shared_buffers>512*this.constSize.MB/this.constSize.KB&&(e.shared_buffers=512*this.constSize.MB/this.constSize.KB),e.effective_cache_size={web:Math.floor(3*o/4),oltp:Math.floor(3*o/4),dw:Math.floor(3*o/4),desktop:Math.floor(o/4),mixed:Math.floor(3*o/4)}[this.dbType],s=(o-e.shared_buffers)/(3*e.max_connections),e.work_mem={web:Math.floor(s),oltp:Math.floor(s),dw:Math.floor(s/2),desktop:Math.floor(s/6),mixed:Math.floor(s/2)}[this.dbType],e.maintenance_work_mem={web:Math.floor(o/16),oltp:Math.floor(o/16),dw:Math.floor(o/8),desktop:Math.floor(o/16),mixed:Math.floor(o/16)}[this.dbType],e.maintenance_work_mem>2*this.constSize.GB/this.constSize.KB&&(e.maintenance_work_mem=Math.floor(2*this.constSize.GB/this.constSize.KB))):n="# WARNING\n# this tool not being optimal \n# for low memory systems\n",e.checkpoint_segments={web:32,oltp:64,dw:128,desktop:3,mixed:32}[this.dbType],e.checkpoint_completion_target={web:.7,oltp:.9,dw:.9,desktop:.5,mixed:.9}[this.dbType],null!=e.shared_buffers&&(e.wal_buffers=Math.floor(3*e.shared_buffers/100),e.wal_buffers>16*this.constSize.MB/this.constSize.KB&&(e.wal_buffers=Math.floor(16*this.constSize.MB/this.constSize.KB)),14*this.constSize.MB/this.constSize.KB<(a=e.wal_buffers)&&a<16*this.constSize.MB/this.constSize.KB&&(e.wal_buffers=Math.floor(16*this.constSize.MB/this.constSize.KB))),e.default_statistics_target={web:100,oltp:100,dw:500,desktop:100,mixed:100}[this.dbType],t=function(){var t;t=[];for(i in e)r=e[i],t.push(""+i+" = "+this._formatedValue(i,r));return t}.call(this),this.codeOut.text(""+n+t.join("\n"))},t.prototype._kernelSettings=function(){var t,e;return"windows"===this.osType?$("#oldPostgresBlock").hide():(e=Math.floor(this.totalMemory/8192),t="kernel.shmmax="+4096*e+"\nkernel.shmall="+e,this.oldPgkernel.text(t),$("#oldPostgresBlock").show())},t.prototype._hightlightCode=function(){return $("pre code").each(function(t,e){return $(e).removeClass("hljs"),hljs.highlightBlock(e)})},t.prototype._formatedValue=function(t,e){var n;return-1!==jQuery.inArray(t,this._notSizeValues())?""+e:(e%this.constSize.KB_PER_GB===0?(e=Math.floor(e/this.constSize.KB_PER_GB),n="GB"):e%this.constSize.KB_PER_MB===0?(e=Math.floor(e/this.constSize.KB_PER_MB),n="MB"):n="kB",""+e+n)},t.prototype._notSizeValues=function(){return["max_connections","checkpoint_segments","checkpoint_completion_target","default_statistics_target","synchronous_commit","random_page_cost","seq_page_cost"]},t.prototype._initAppcache=function(){return Modernizr.applicationcache===!0?window.applicationCache.addEventListener("updateready",this._appCacheUpdated,!1):void 0},t.prototype._appCacheUpdated=function(){return window.applicationCache.status===window.applicationCache.UPDATEREADY&&confirm("A new version of this app is available. Load it?")?window.location.reload():void 0},t}(),$(function(){return $("#pgTuneForm").length&&$("#postgresConfigOut").length&&$("#postgresOldkernelOut").length&&new t($("#pgTuneForm"),$("#postgresConfigOut"),$("#postgresOldkernelOut")),$("#socialSharingBlock").is(":visible")?(window.addthis_config={data_track_addressbar:!0},window.addthis_share={title:"PgTune",description:"Tuning PostgreSQL config by your hardware"},$.getScript("http://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-532ed3f46ffc37ab")):void 0})}).call(this);