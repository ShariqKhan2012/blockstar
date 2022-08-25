import FullWidthLayout from '@/layouts/FullWidth';

const NotFound = () => {
    return (
        <FullWidthLayout>
            <h1 className="text-red-500 text-7xl font-bold text-center">404</h1>
            <h1 className="text-[#333] text-3xl font-bold text-center mt-8">Oops, Page Not Found</h1>
        </FullWidthLayout>
    )
}

export default NotFound;