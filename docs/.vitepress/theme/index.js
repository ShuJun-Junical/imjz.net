import DefaultTheme from 'vitepress/theme-without-fonts'
import ThemeLayout from './ThemeLayout.vue'
import NoteTimeline from './components/NoteTimeline.vue'
import PostList from './components/PostList.vue'
import TagIndex from './components/TagIndex.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: ThemeLayout,
  enhanceApp({ app }) {
    app.component('NoteTimeline', NoteTimeline)
    app.component('PostList', PostList)
    app.component('TagIndex', TagIndex)
  },
}
