import { mainCategorys } from '@/lib/data'
import MainCategory from './main-category'

export default function HomeCategoryFilter() {

  return (
    <div className="flex overflow-auto flex-col gap-[2px]">
      {
        mainCategorys.map(main =>
          <MainCategory key={main.title} main={main} />
        )
      }
    </div>
  )
}