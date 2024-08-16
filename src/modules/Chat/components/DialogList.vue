<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DialogItem from './DialogItem.vue'
import { FriendsController } from '@/data/friends/friendsController'
import { useAuthStore } from '@/stores/auth'
import DropMenu from '@/modules/DropMenu/components/DropMenu.vue'
import DropMenuItem from '@/modules/DropMenu/components/DropMenuItem.vue'

const props = defineProps({
  chats: Array,
  selectChatId: Number,
})

defineEmits(['selectChat'])

const authStore = useAuthStore()
const router = useRouter()

const friends = ref([])
const newDialogModalActive = ref(false)
const showNewDialogDropMenu = ref(false)

function showFriendList() {
  newDialogModalActive.value = true
  friends.value = JSON.parse(FriendsController.getFriends(authStore.authUser.id))
}

function selectDialogWithFriend(id) {
  router.push({ path: '/messages', query: { id } })
  modalActive.value = false
}
</script>

<template>
  <section class="dialogs">
    <div class="header">
      <div class="title">
        Мои диалоги
      </div>
      <DropMenu
        v-model="showNewDialogDropMenu"
        :hover="true"
      >
        <template #activator>
          <button
            class="new-dialog icon-wrapper"
            @click="showFriendList"
          >
            <v-icon
              class="icon"
              icon="mdi mdi-plus"
            />
          </button>
        </template>
        <template #content>
          <div class="users">
            <DropMenuItem
              v-for="friend in friends"
              :key="friend.id"
              class="user"
              @click="selectDialogWithFriend(friend.id)"
            >
              <div class="avatar">
                <img src="@/assets/default-user-image.png">
              </div>
              <div class="info">
                {{ friend.name }} {{ friend.surname }}
              </div>
            </DropMenuItem>
          </div>
        </template>
      </DropMenu>
    </div>
    <div
      v-if="chats.length"
      class="dialog-list"
    >
      <DialogItem
        v-for="chat in props.chats"
        :key="chat.id"
        :chat="chat"
        :select-chat-id="selectChatId"
        @select-chat="(chatId) => $emit('selectChat', chatId)"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import url(../styles/DialogList.scss);
</style>
