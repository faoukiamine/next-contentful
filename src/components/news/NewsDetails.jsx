import ContentfulImage from '../ui/ContentfulImage'
import DateComponent from '../ui/DateComponent'
import RichText from '../RichText'

const NewsDetails = ({ news }) => {
  const { title, featuredImage, content, tags } = news.fields
  const date = news.sys.createdAt

  return (
    <>
      <h2 className='text-red-600 my-0'>{title}</h2>
      <DateComponent dateString={date} className='text-sm text-red-600' />
      <p class="text-red-600">
        {tags.map((tag, i) => (
          <span class="inline-block mr-2">#{tag}</span>
        ))}
      </p>
      <div className='mb-8 md:mb-16 sm:mx-0'>
        <ContentfulImage
          alt={`Cover Image for ${title}`}
          src={featuredImage.fields.file.url}
          width={featuredImage.fields.file.details.image.width}
          height={featuredImage.fields.file.details.image.height}
        />
      </div>
      <div className='flex justify-between items-center md:hidden mb-6'>
        <DateComponent dateString={date} className='text-sm text-gray-400' />
      </div>
      <div className='mx-auto prose'>
        <RichText content={content} />
      </div>
    </>
  )
}

export default NewsDetails