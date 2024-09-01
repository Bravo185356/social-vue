<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ChatItem from './ChatItem.vue'
import { FriendsController } from '@/data/friends/friendsController'
import { useAuthStore } from '@/stores/auth'
import DropMenu from '@/modules/DropMenu/components/DropMenu.vue'
import DropMenuItem from '@/modules/DropMenu/components/DropMenuItem.vue'
import CustomButton from '@/UI/CustomButton.vue'

const props = defineProps({
  chats: Array,
  selectChatId: Number,
})

defineEmits(['selectChat'])

const authStore = useAuthStore()
const router = useRouter()

const friends = ref([])
const newChatModalActive = ref(false)
const showNewChatDropMenu = ref(false)

function showFriendList() {
  newChatModalActive.value = true
  friends.value = JSON.parse(FriendsController.getFriends(authStore.authUser.id))
}

function selectChatWithFriend(id) {
  router.push({ path: '/messages', query: { id } })
}
</script>

<template>
  <section class="chats">
    <div class="header">
      <div class="title">
        Мои диалоги
      </div>
      <DropMenu
        v-model="showNewChatDropMenu"
        :hover="true"
      >
        <template #activator>
          <CustomButton
            type="icon"
            @click="showFriendList"
          >
            <v-icon
              class="icon"
              icon="mdi mdi-plus"
            />
          </CustomButton>
        </template>
        <template #content>
          <div class="users">
            <DropMenuItem
              v-for="friend in friends"
              :key="friend.id"
              class="user"
              @click="selectChatWithFriend(friend.id)"
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
    <div v-if="chats.length">
      <ChatItem
        v-for="chatItem in props.chats"
        :key="chatItem.id"
        :chat-item="chatItem"
        :select-chat-id="selectChatId"
        @select-chat="(chatId) => $emit('selectChat', chatId)"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/styles/_variables.scss';

.chats {
  flex: 0 1 35%;
  border-right: 1px solid $border-color;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $border-color;
  padding: 0px 15px;
}

.friend-add {
  padding: 5px;
  cursor: pointer;

  &:hover {
    color: white;
  }
}

.title {
  font-size: 18px;
  padding: 15px 15px 15px 0px;
}

.select-friend {
  border-bottom: 1px solid $border-color;
}

.users {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 30px;
  height: 30px;
}
</style>
