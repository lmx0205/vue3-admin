import { ref } from 'vue'
import { generateId, deepClone } from '@/utils/utils'
export const createDesigner = () => {
  const widgetList = ref<any>([])
  const selectedId = ref(null)
  const selectedWidget = ref({})

  const initDesigner = () => {
    widgetList.value = []
    getDesignerStorage()
  }

  const clearDesigner = () => {
    widgetList.value = []
    selectedId.value = null
    selectedWidget.value = {}
    setDesignerStorage()
  }

  const checkFieldMove = (evt:any) => {
    return true
  }
  const copyNewFieldWidget = (origin:any) => {
    const newWidget = deepClone(origin)
    const tempId = generateId()
    newWidget.id = newWidget.type.replace(/-/g, '') + tempId
    newWidget.options.name = newWidget.id
    newWidget.options.label = newWidget.options.label || newWidget.type.toLowerCase()
    delete newWidget.displayName
    return newWidget
  }

  const addFieldByDbClick = (widget:any) => {
    const newWidget = copyNewFieldWidget(widget)
    widgetList.value.push(newWidget)
    setSelected(newWidget)
    setDesignerStorage()
  }

  const setSelected = (selected:any) => {
    if (!selected) {
      clearSelected()
      return
    }
    selectedWidget.value = selected
    if (selected.id) {
      selectedId.value = selected.id
    }
  }

  const clearSelected = () => {
    selectedId.value = null
    selectedWidget.value = {}
  }

  const setDesignerStorage = () => {
    window.localStorage.setItem('widget__list__storage', JSON.stringify(widgetList.value))
  }

  const getDesignerStorage = () => {
    const widgetListStorage = window.localStorage.getItem('widget__list__storage')
    if (widgetListStorage) {
      widgetList.value = JSON.parse(widgetListStorage)
    }
  }

  return { widgetList, selectedId, selectedWidget, initDesigner, clearDesigner, checkFieldMove, copyNewFieldWidget, addFieldByDbClick, setDesignerStorage, getDesignerStorage }
}
