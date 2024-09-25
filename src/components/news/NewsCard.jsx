import Link from 'next/link'
import ContentfulImage from '../ui/ContentfulImage'
import DateComponent from '../ui/DateComponent'

const NewsCard = ({ item }) => {
  const { title, slug, thumbnail, tags } = item.fields
  const date = item.sys.createdAt

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <Link href={`/news/${slug}`} aria-label={title}>
            <ContentfulImage
                alt={`Cover Image for ${title}`}
                src={thumbnail.fields.file.url}
                width={thumbnail.fields.file.details.image.width}
                height={thumbnail.fields.file.details.image.height}
            />
        </Link>
        <div className="px-6 py-4">
            <p className="text-red-600">{tags.map((tag, i) => (
                <span key={i} className="inline-block mr-2">#{tag}</span>
            ))}
            </p>
            <Link href={`/news/${slug}`} aria-label={title} className="text-black text-xl mb-2">{title}</Link>
        </div>
        <div className="px-6 pt-4 pb-2">
            <p className="text-gray-600"><DateComponent dateString={date} /></p>
        </div>        
    </div>
  )
}

export default NewsCard
