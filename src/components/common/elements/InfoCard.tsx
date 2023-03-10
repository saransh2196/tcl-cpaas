import useLocales from '../../../hooks/useLocales'
import Card from './card'

export const InfoCard = ({ data = [] }: any) => {
  const { t } = useLocales()
  return (
    <div className="card-wrapper-1">
      {data.map((q: any, i: any) => <Card data={q} key={`card-warpper${i}`} />)}
    </div >
  )
}
