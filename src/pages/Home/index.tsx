import { Button } from '@/components/Button/Button'
import ApiService from '@/sevices/ApiService'
import { modInformationsInterface } from '@/types/mod.types'

const Home = () => {
    const mod: modInformationsInterface = {
        title: 'test8',
        description: 'desc8',
    }

    const handleCreate = async () => {
        const response = await ApiService.createMod(mod)
        const mods = await response.json()
        console.log(mods)
    }

    const handleUpdate = async () => {
        const response = await ApiService.updateMod(
            mod,
            '38ae1fbb-56ca-42e5-8ee6-1df3a7091c94'
        )
        const mods = await response.json()
        console.log(mods)
    }

    const handleDelete = async () => {
        const response = await ApiService.deleteMod(
            '38ae1fbb-56ca-42e5-8ee6-1df3a7091c94'
        )
        const mods = await response.json()
        console.log(mods)
    }

    const handleSearch = async () => {
        const response = await ApiService.searchMods({
            q: 'test',
        })
        const mods = await response.json()
        console.log(mods)
    }

    const handleGet = async () => {
        const response = await ApiService.getMod(
            '38ae1fbb-56ca-42e5-8ee6-1df3a7091c94'
        )
        const mod = await response.json()
        console.log(mod)
    }

    return (
        <div className="">
            <Button
                onClick={handleCreate}
                size="large"
                background="blue"
                label="Create mod"
            />
            <Button
                onClick={handleSearch}
                size="large"
                background="green"
                label="Search mods"
            />
            <Button
                onClick={handleGet}
                size="large"
                background="red"
                label="Get one mod"
            />
            <Button
                onClick={handleUpdate}
                size="large"
                background="yellow"
                label="Update mod"
            />
            <Button
                onClick={handleDelete}
                size="large"
                background="blue"
                label="Delete mod"
            />
        </div>
    )
}

export default Home
