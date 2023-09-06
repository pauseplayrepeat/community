import { UserButton } from "@clerk/nextjs";

const MainLayout = async ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div>
            <UserButton />
            {children}
        </div>
    )
}

export default MainLayout;