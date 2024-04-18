import { Button } from '@/components/Button/Button'
import ApiService from '@/sevices/ApiService'
import { modInterface } from '@/types/mod.types'

const Home = () => {
    const mod: modInterface = {
        name: 'test',
        description: 'desc',
    }

    const handleCreate = async () => {
        const response = await ApiService.createMod(mod)
        console.log(response)
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
