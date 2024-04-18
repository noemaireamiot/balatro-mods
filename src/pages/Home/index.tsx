import { Button } from '@/components/Button/Button'
import ApiService from '@/sevices/ApiService'

const Home = () => {
    const handleCreate = async () => {
        const response = await ApiService.createMod()
        const mods = await response.json()
        console.log(mods)
    }

    return (
        <div className="">
            <Button
                onClick={handleCreate}
                size="large"
                background="blue"
                label="Create mod"
            />
        </div>
    )
}

export default Home
