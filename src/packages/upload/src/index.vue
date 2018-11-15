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
		beforeUpload: Function,
		onChange: {
			type: Function,
			default: noop
		},
		onError: {
			type: Function,
			default: noop
		},
		fileList: {
			type: Array,
			default() {
				return [];
			}
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
		},
		onProgress: {
			type: Function,
			default: noop
		},
		onSuccess: {
			type: Function,
			default: noop
		}
	},

	data() {
		return {
			// 文件列表
			uploadFiles: [],
			tempIndex: 1
		};
	},

	computed: {

	},

	watch: {
		fileList: {
			// immediate 立即触发
			immediate: true,
			handler(fileList) {
				let i = 0;
				// fileList 是新的fileList值
				this.uploadFiles = fileList.map(item => {
					item.uid = item.uid || (Date.now() + this.tempIndex);
					item.status = item.status || 'success';
					return item;
				});
			}
		}
	},

	methods: {
		// 开始上传事件
		handleStart(rawFile) {
			rawFile.uid = Date.now() + this.tempIndex++;
			let file = {
				status: 'ready', // 上传的状态
				name: rawFile.name,
				size: rawFile.size,
				percentage: 0,
				uid: rawFile.uid,
				raw: rawFile // 保存手动上传的文件
			};

			try {
				file.url = URL.createObjectURL(rawFile);
			} catch (err){
				return;
			}
			this.uploadFiles.push(file);
			// 文件改变时候的钩子 添加文件 上传成功失败都会调用
			this.onChange(file, this.uploadFiles);
		},

		// 取消上传请求
		abort(file) {
			this.$refs['upload-inner'].abort(file);
		},

		clearFiles() {
			this.uploadFiles = [];
		},

		handleSuccess(res, rawFile) {
			const file = this.getFile(rawFile);

			if (file) {
				file.status = 'success';
				file.response = res;
				this.onSuccess(res, file, this.uploadFiles);
				this.onChange(file, this.uploadFiles);
			}
		},

		handleError(err, rawFile) {
			const file = this.getFile(rawFile);
			const fileList = this.uploadFiles;

			file.status = 'fail';
			fileList.splice(fileList.indexOf(file), 1);

			this.onError(err, file, this.uploadFiles);
			this.onChange(file, this.uploadFiles);
		},

		handleProgress(e, file) {
			this.onProgress(e, file);
		},

		getFile(rawFile) {
			let fileList = this.uploadFiles;
			let target;
			// 
			fileList.every(item => {
				target = rawFile.uid === item.uid ? item : null;
				return !target;
			});
			return target;
		},

		// 手动上传
		submit() {
			this.uploadFiles.filter(file => file.status === 'ready')
				.forEach(file => {
					this.$refs['upload-inner'].upload(file.raw);
				})
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
				'before-upload': this.xw, // 上传之前的钩子函数
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
				'on-success': this.handleSuccess,
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
