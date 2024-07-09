<template>
  <section class="dialogs">
    <div class="header">
      <div class="title">Мои диалоги</div>
      <div @click="showFriendList" class="new-dialog icon-wrapper-gray">
        <v-icon class="icon" icon="mdi mdi-plus" />
      </div>
      <CustomModal v-model="newDialogModalActive">
        <template v-slot:title>
          <div>Выберите друга</div>
        </template>
        <template v-slot:content>
          <div class="users">
            <div @click="selectDialogWithFriend(friend.id)" v-for="friend in friends" :key="friend.id" class="user">
              <div class="avatar">
                <img src="@/assets/default-user-image.png" />
              </div>
              <div class="info">{{ friend.name }} {{ friend.surname }}</div>
            </div>
          </div>
        </template>
      </CustomModal>
    </div>
    <div v-if="chats.length" class="dialog-list">
      <DialogItem
        @select-chat="(chatId) => $emit('selectChat', chatId)"
        v-for="chat in props.chats"
        :key="chat.id"
        :chat="chat"
        :selectChatId="selectChatId"
      />
    </div>
  </section>
</template>

<script setup>
import CustomModal from '@/UI/Modal/CustomModal.vue';
import DialogItem from './DialogItem.vue';
import { FriendsController } from '@/data/friends/friendsController';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  chats: Array,
  selectChatId: Number,
});

const authStore = useAuthStore();
const router = useRouter();

const friends = ref([]);
const newDialogModalActive = ref(false);

function showFriendList() {
  newDialogModalActive.value = true;
  friends.value = JSON.parse(FriendsController.getFriends(authStore.authUser.id));
}

function selectDialogWithFriend(id) {
  router.push({ path: '/messages', query: { id } });
  modalActive.value = false;
}
</script>

<style lang="scss" scoped>
@import url(../styles/DialogList.scss);
</style>
