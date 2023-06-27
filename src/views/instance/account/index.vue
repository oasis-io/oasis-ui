<template>
  <div class="table-box">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="帐号名" width="180" />
      <el-table-column align="left" prop="desc" label="描述" min-width="180" />
      <el-table-column align="left" label="操作" min-width="200">
        <template #default="scope">
          <el-button icon="edit" type="primary" link @click.prevent="editRow(scope.row)">
            编辑
          </el-button>
          <el-button icon="delete" type="primary" link @click.prevent="deleteRow(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50]"
        :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
        :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { getAccountList } from '@/api/instance';


const tableData = ref([]);
const total = ref(0)
const currentPage = ref(1);
const pageSize = ref(10);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);


const getTableData = async () => {
  const table = await getAccountList({ pageSize: pageSize.value, currentPage: currentPage.value });
  if ((table.data.code === 1000)) {
    tableData.value = table.data.data.data;
    total.value = table.data.data.total;
    pageSize.value = table.data.data.pageSize;
    currentPage.value = table.data.data.currentPage;
  }
};

getTableData()

const editRow = async (row: string) => {
}

const deleteRow = async (row: string) => {
}


const handleSizeChange = (val: number) => {
  pageSize.value = val;
  getTableData();
};
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  getTableData();
};

</script>

