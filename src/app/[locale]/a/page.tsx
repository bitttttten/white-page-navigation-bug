import {useTranslations} from 'next-intl';
import { Link } from '../../../navigation';

export default function A() {
  const t = useTranslations('a');
  return <>
  <h1>{t('title')}</h1>
  <Link href="/a/b/">go to b</Link>
  </>
}
