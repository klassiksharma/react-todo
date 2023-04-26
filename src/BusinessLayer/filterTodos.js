export default function filterTodo(todos = []) {
    let [open, completed] = [[], []]
    todos.forEach(item => {
        if (item.completed) {
            completed.push(item)
        } else {
            open.push(item)
        }
    })
    return [open, completed]
}