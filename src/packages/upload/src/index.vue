<script>
import upload from './upload';

function noop() {};

export default {
  name: 'VUpload',

  components: {
    upload
  },

	provide() {
		return {
			uploader: this
		};
	},

	inject: {
		elForm: {
			default: ''
		}
	},

	props: {
		action: {
			type: String,
			required: true
		},
		headers: {
			type: Object,
			default() {
				return {};
			}
		},
		data: Object,
		multiple: Boolean,
		name: {
			type: String,
			default: 'file'	
		},
		type: {
			type: String,
			default: 'select'
		},
		onChange: {
			type: Function,
			default: noop
		},
		onSuccess: {
			type: Function,
			default: noop
		},
		onError: {
			type: Function,
			default: noop
		},
		listType: {
			type: String,
			default: 'text'
		},
		httpRequest: Function,
		limit: Number,
		disabled: Boolean,
		onExceed: {
			type: Function,
			default: noop
		}
	},

	data() {
		return {
			tempIndex: 1
		};
	},

	computed: {

	},

	methods: {
		// 开始上传事件
		handleStart(rawFile) {
			rawFile.uid = Date.now() + this.tempIndex++;
			let file = {
				status: 'ready',
				name: rawFile.name,
				size: rawFile.size,
				percentage: 0,
				uid: rawFile.uid,
				raw: rawFile
			};

			try {

			} catch (err){

			}
		}
	},

  render(h) {
		// 照片墻
		let uploadList;

		const uploadData = {
			props: {
				type: this.type, // 类型
				drag: this.drag, // 是否可拖动
				action: this.action, // 上传地址 必传参数
				multiple: this.multiple, // 是否支持多选文件
				'before-upload': this.beforUpload, // 上传之前的钩子函数
				'with-credentials': this.withCredentials, // 支持发送cookies 凭证
				headers: this.headers,
				name: this.name, // 上传的字段名
				data: this.data, // 上传附带的额外参数
				accept: this.accept, // 接受上传的类型
				fileList: this.uploadFiles, // 上传文件列表
				autoUpload: this.autoUpload, // 是否在选中文件后立即上传
				listType: this.listType, // 文件列表的类型 text 文字 picture 图片 picture-card 照片墙
				limit: this.limit, // 上传限制个数
				disabled: this.uploadDisabled, // 是否禁用
				'on-exceed': this.onExceed, //
				'on-start': this.handleStart,
				'on-progress': this.handleProgress,
				'on-succress': this.handleSuccess,
				'on-error': this.handleError,
				'on-preview': this.onPreview,
				'on-remove': this.handleRemove,
				'http-request': this.httpRequest
			},
			ref: 'upload-inner'
		};
		
		const trigger = this.$slots.trigger || this.$slots.default;
		const uploadComponent = <upload {...uploadData}> {trigger} </upload>;

		return (
			<div>
				{ this.listType === 'picture-card' ? uploadList : '' }
				{
					uploadComponent
				}
			</div>
		);
  }
};
</script>
