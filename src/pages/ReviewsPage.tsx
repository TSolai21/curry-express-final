import Feedback from '../components/Feedback';
import PageBanner from '../components/PageBanner';

export default function ReviewsPage() {
  return (
    <main className="flex-1">
      <PageBanner title="Reviews" breadcrumbLabel="Reviews" />
      <Feedback />
    </main>
  );
}
