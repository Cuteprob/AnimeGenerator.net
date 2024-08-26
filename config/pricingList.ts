import { PlanProps } from '@/types/pricing';

export const PricingList: { [key: string]: PlanProps[] } = {
  PRICING_EN: [
    // ... (保持原有的 PRICING_EN 内容不变)
  ],
  
  PRICING_ZH: [
    {
      title: "免费",
      price: 0,
      annualDiscount: 0,
      duration: "月",
      credits: 100,
      features: [
        { text: "100 点数", included: true },
        { text: "每天3个动漫", included: true },
        { text: "3天历史记录", included: true },
        { text: "同时运行1个任务", included: true },
        { text: "低生成速度", included: true },
        { text: "私密生成", included: false },
        { text: "商业许可", included: false },
        { text: "优先电子邮件支持", included: false },
        { text: "下载原始质量PNG", included: false },
      ],
    },
    {
      title: "基础",
      price: 9.99,
      annualDiscount: 20,
      duration: "月",
      credits: 500,
      features: [
        { text: "500 点数", included: true },
        { text: "无限制", included: true },
        { text: "30天历史记录", included: true },
        { text: "批量运行任务", included: true },
        { text: "快速生成速度", included: true },
        { text: "私密生成", included: true },
        { text: "商业许可", included: true },
        { text: "优先电子邮件支持", included: true },
        { text: "下载原始质量PNG", included: true },
      ],
      recommend: true,
    },
    {
      title: "专业",
      price: 19.99,
      annualDiscount: 25,
      duration: "月",
      credits: 1500,
      features: [
        { text: "1500 点数", included: true },
        { text: "无限制", included: true },
        { text: "无限历史记录", included: true },
        { text: "批量运行任务", included: true },
        { text: "快速生成速度", included: true },
        { text: "私密生成", included: true },
        { text: "商业许可", included: true },
        { text: "优先电子邮件支持", included: true },
        { text: "下载原始质量PNG", included: true },
      ],
      bestValue: true,
    },
  ],

  PRICING_ES: [
    {
      title: "Gratis",
      price: 0,
      annualDiscount: 0,
      duration: "mes",
      credits: 100,
      features: [
        { text: "100 Créditos", included: true },
        { text: "3 Animes/día", included: true },
        { text: "Historial de 3 días", included: true },
        { text: "1 tarea en ejecución a la vez", included: true },
        { text: "Velocidad de generación baja", included: true },
        { text: "Generaciones privadas", included: false },
        { text: "Licencia comercial", included: false },
        { text: "Soporte por correo prioritario", included: false },
        { text: "Descarga en calidad original en PNG", included: false },
      ],
    },
    {
      title: "Básico",
      price: 9.99,
      annualDiscount: 20,
      duration: "mes",
      credits: 500,
      features: [
        { text: "500 Créditos", included: true },
        { text: "Sin limitaciones", included: true },
        { text: "Historial de 30 días", included: true },
        { text: "Tareas en lote a la vez", included: true },
        { text: "Velocidad de generación rápida", included: true },
        { text: "Generaciones privadas", included: true },
        { text: "Licencia comercial", included: true },
        { text: "Soporte por correo prioritario", included: true },
        { text: "Descarga en calidad original en PNG", included: true },
      ],
      recommend: true,
    },
    {
      title: "Pro",
      price: 19.99,
      annualDiscount: 25,
      duration: "mes",
      credits: 1500,
      features: [
        { text: "1500 Créditos", included: true },
        { text: "Sin limitaciones", included: true },
        { text: "Historial ilimitado", included: true },
        { text: "Tareas en lote a la vez", included: true },
        { text: "Velocidad de generación rápida", included: true },
        { text: "Generaciones privadas", included: true },
        { text: "Licencia comercial", included: true },
        { text: "Soporte por correo prioritario", included: true },
        { text: "Descarga en calidad original en PNG", included: true },
      ],
      bestValue: true,
    },
  ],

  PRICING_RU: [
    {
      title: "Бесплатно",
      price: 0,
      annualDiscount: 0,
      duration: "мес",
      credits: 100,
      features: [
        { text: "100 Кредитов", included: true },
        { text: "3 Аниме/день", included: true },
        { text: "История за 3 дня", included: true },
        { text: "1 задача одновременно", included: true },
        { text: "Низкая скорость генерации", included: true },
        { text: "Приватные генерации", included: false },
        { text: "Коммерческая лицензия", included: false },
        { text: "Приоритетная поддержка по email", included: false },
        { text: "Скачивание в оригинальном качестве PNG", included: false },
      ],
    },
    {
      title: "Базовый",
      price: 9.99,
      annualDiscount: 20,
      duration: "мес",
      credits: 500,
      features: [
        { text: "500 Кредитов", included: true },
        { text: "Без ограничений", included: true },
        { text: "История за 30 дней", included: true },
        { text: "Пакетное выполнение задач", included: true },
        { text: "Быстрая скорость генерации", included: true },
        { text: "Приватные генерации", included: true },
        { text: "Коммерческая лицензия", included: true },
        { text: "Приоритетная поддержка по email", included: true },
        { text: "Скачивание в оригинальном качестве PNG", included: true },
      ],
      recommend: true,
    },
    {
      title: "Про",
      price: 19.99,
      annualDiscount: 25,
      duration: "мес",
      credits: 1500,
      features: [
        { text: "1500 Кредитов", included: true },
        { text: "Без ограничений", included: true },
        { text: "Неограниченная история", included: true },
        { text: "Пакетное выполнение задач", included: true },
        { text: "Быстрая скорость генерации", included: true },
        { text: "Приватные генерации", included: true },
        { text: "Коммерческая лицензия", included: true },
        { text: "Приоритетная поддержка по email", included: true },
        { text: "Скачивание в оригинальном качестве PNG", included: true },
      ],
      bestValue: true,
    },
  ],

  PRICING_FR: [
    {
      title: "Gratuit",
      price: 0,
      annualDiscount: 0,
      duration: "mois",
      credits: 100,
      features: [
        { text: "100 Crédits", included: true },
        { text: "3 Animes/jour", included: true },
        { text: "Historique de 3 jours", included: true },
        { text: "1 tâche en cours à la fois", included: true },
        { text: "Vitesse de génération lente", included: true },
        { text: "Générations privées", included: false },
        { text: "Licence commerciale", included: false },
        { text: "Support email prioritaire", included: false },
        { text: "Téléchargement en qualité originale PNG", included: false },
      ],
    },
    {
      title: "Basique",
      price: 9.99,
      annualDiscount: 20,
      duration: "mois",
      credits: 500,
      features: [
        { text: "500 Crédits", included: true },
        { text: "Sans limitations", included: true },
        { text: "Historique de 30 jours", included: true },
        { text: "Tâches en lot simultanées", included: true },
        { text: "Vitesse de génération rapide", included: true },
        { text: "Générations privées", included: true },
        { text: "Licence commerciale", included: true },
        { text: "Support email prioritaire", included: true },
        { text: "Téléchargement en qualité originale PNG", included: true },
      ],
      recommend: true,
    },
    {
      title: "Pro",
      price: 19.99,
      annualDiscount: 25,
      duration: "mois",
      credits: 1500,
      features: [
        { text: "1500 Crédits", included: true },
        { text: "Sans limitations", included: true },
        { text: "Historique illimité", included: true },
        { text: "Tâches en lot simultanées", included: true },
        { text: "Vitesse de génération rapide", included: true },
        { text: "Générations privées", included: true },
        { text: "Licence commerciale", included: true },
        { text: "Support email prioritaire", included: true },
        { text: "Téléchargement en qualité originale PNG", included: true },
      ],
      bestValue: true,
    },
  ],

  PRICING_AR: [
    {
      title: "مجاني",
      price: 0,
      annualDiscount: 0,
      duration: "شهر",
      credits: 100,
      features: [
        { text: "100 رصيد", included: true },
        { text: "3 أنمي/يوم", included: true },
        { text: "سجل لمدة 3 أيام", included: true },
        { text: "مهمة واحدة في وقت واحد", included: true },
        { text: "سرعة إنشاء منخفضة", included: true },
        { text: "إنشاءات خاصة", included: false },
        { text: "ترخيص تجاري", included: false },
        { text: "دعم بريد إلكتروني ذو أولوية", included: false },
        { text: "تنزيل بجودة أصلية بصيغة PNG", included: false },
      ],
    },
    {
      title: "أساسي",
      price: 9.99,
      annualDiscount: 20,
      duration: "شهر",
      credits: 500,
      features: [
        { text: "500 رصيد", included: true },
        { text: "بدون قيود", included: true },
        { text: "سجل لمدة 30 يوم", included: true },
        { text: "تشغيل مهام متعددة في وقت واحد", included: true },
        { text: "سرعة إنشاء عالية", included: true },
        { text: "إنشاءات خاصة", included: true },
        { text: "ترخيص تجاري", included: true },
        { text: "دعم بريد إلكتروني ذو أولوية", included: true },
        { text: "تنزيل بجودة أصلية بصيغة PNG", included: true },
      ],
      recommend: true,
    },
    {
      title: "محترف",
      price: 19.99,
      annualDiscount: 25,
      duration: "شهر",
      credits: 1500,
      features: [
        { text: "1500 رصيد", included: true },
        { text: "بدون قيود", included: true },
        { text: "سجل غير محدود", included: true },
        { text: "تشغيل مهام متعددة في وقت واحد", included: true },
        { text: "سرعة إنشاء عالية", included: true },
        { text: "إنشاءات خاصة", included: true },
        { text: "ترخيص تجاري", included: true },
        { text: "دعم بريد إلكتروني ذو أولوية", included: true },
        { text: "تنزيل بجودة أصلية بصيغة PNG", included: true },
      ],
      bestValue: true,
    },
  ],
  PRICING_JA: [
    {
      title: "無料",
      price: 0,
      annualDiscount: 0,
      duration: "月",
      credits: 100,
      features: [
        { text: "100 クレジット", included: true },
        { text: "1日3アニメ", included: true },
        { text: "3日間の履歴", included: true },
        { text: "同時に1つのジョブを実行", included: true },
        { text: "低速生成", included: true },
        { text: "プライベート生成", included: false },
        { text: "商用ライセンス", included: false },
        { text: "優先メールサポート", included: false },
        { text: "オリジナル品質のPNGダウンロード", included: false },
      ],
    },
    {
      title: "ベーシック",
      price: 9.99,
      annualDiscount: 20,
      duration: "月",
      credits: 500,
      features: [
        { text: "500 クレジット", included: true },
        { text: "制限なし", included: true },
        { text: "30日間の履歴", included: true },
        { text: "一度に複数のジョブを実行", included: true },
        { text: "高速生成", included: true },
        { text: "プライベート生成", included: true },
        { text: "商用ライセンス", included: true },
        { text: "優先メールサポート", included: true },
        { text: "オリジナル品質のPNGダウンロード", included: true },
      ],
      recommend: true,
    },
    {
      title: "プロ",
      price: 19.99,
      annualDiscount: 25,
      duration: "月",
      credits: 1500,
      features: [
        { text: "1500 クレジット", included: true },
        { text: "制限なし", included: true },
        { text: "無制限の履歴", included: true },
        { text: "一度に複数のジョブを実行", included: true },
        { text: "高速生成", included: true },
        { text: "プライベート生成", included: true },
        { text: "商用ライセンス", included: true },
        { text: "優先メールサポート", included: true },
        { text: "オリジナル品質のPNGダウンロード", included: true },
      ],
      bestValue: true,
    },
  ],

}