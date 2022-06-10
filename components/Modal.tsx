import { VolumeOffIcon } from '@heroicons/react/outline'
import {
  PauseIcon,
  PlusIcon,
  ThumbUpIcon,
  VolumeUpIcon,
  XIcon,
} from '@heroicons/react/solid'
import MuiModal from '@mui/material/Modal'
import { useEffect, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import ReactPlayer from 'react-player/lazy'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Movie, Element, Genre } from '../typings'

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [movie, setMovie] = useRecoilState(movieState)
  const [trailer, setTrailer] = useState('')
  const [genres, setGenres] = useState<Genre[]>([])

  useEffect(() => {
    if (!movie) return

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json())

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        )
        setTrailer(data.videos?.results[index]?.key)
      }

      if (data?.genre) {
        setGenres(data.genres)
      }
    }

    fetchMovie()
  }, [movie])

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    // {TODO: Style modal with a banner and an addList button beside the close}
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <div className="flex items-center bg-[#141414] text-[#f9f9f9] p-3.5">
          <span className="font-semibold text-[#ec8200]">
            {movie?.title || movie?.name || movie?.original_name}
          </span>
          <button className="modalButton absolute right-16 border-none cursor-pointer w-8 h-8 flex justify-center items-center rounded-full opacity-50 hover:opacity-75 !z-40 bg-[#181818] hover:text-[#ec8200] transition duration-200 ease-out hover:scale-105">
            <PlusIcon className="h-6 w-6" />
          </button>
          <button
            className="modalButton absolute right-4 border-none cursor-pointer w-8 h-8 flex justify-center items-center rounded-full opacity-50 hover:opacity-75 !z-40 bg-[#181818] hover:text-[#ec8200] transition duration-200 ease-out hover:scale-105"
            onClick={handleClose}
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={
              `https://www.youtube.com/watch?v=${trailer}` ||
              `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
            }
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            controls
          />
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#141414] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie!.vote_average * 10}% Match
              </p>
              <p className="font-light ">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                {/* <div>
                  <span className="text-[gray]">Genres:</span>{' '}
                  {genres.map((genre) => genre.name).join(', ')}
                </div> */}

                <div>
                  <span className="text-[gray]">Original Language:</span>{' '}
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total Votes:</span>{' '}
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  )
}

export default Modal
