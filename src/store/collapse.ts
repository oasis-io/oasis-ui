import { defineStore } from 'pinia';

// 侧边栏折叠用
export const useSidebarStore = defineStore('sidebar', {
	state: () => {
		return {
			isCollapse: false
		};
	},
	getters: {},
	actions: {
		handleCollapse() {
			this.isCollapse = !this.isCollapse;
		}
	}
});
