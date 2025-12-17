import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Branch {
  id: number;
  city: string;
  region: string;
  x: number;
  y: number;
  employees: number;
  area: string;
  manager: string;
  phone: string;
}

const branches: Branch[] = [
  { id: 1, city: 'Москва', region: 'Центральный', x: 55, y: 42, employees: 450, area: '12,000 га', manager: 'Иванов И.И.', phone: '+7 (495) 123-45-67' },
  { id: 2, city: 'Тула', region: 'Центральный', x: 54, y: 44, employees: 120, area: '8,500 га', manager: 'Петров П.П.', phone: '+7 (487) 234-56-78' },
  { id: 3, city: 'Рязань', region: 'Центральный', x: 58, y: 43, employees: 95, area: '6,200 га', manager: 'Сидоров С.С.', phone: '+7 (491) 345-67-89' },
  { id: 4, city: 'Краснодар', region: 'Южный', x: 45, y: 65, employees: 380, area: '15,000 га', manager: 'Козлов К.К.', phone: '+7 (861) 456-78-90' },
  { id: 5, city: 'Ростов-на-Дону', region: 'Южный', x: 47, y: 58, employees: 290, area: '11,500 га', manager: 'Смирнов В.В.', phone: '+7 (863) 567-89-01' },
  { id: 6, city: 'Ставрополь', region: 'Южный', x: 48, y: 68, employees: 210, area: '9,800 га', manager: 'Новиков Н.Н.', phone: '+7 (865) 678-90-12' },
  { id: 7, city: 'Волгоград', region: 'Южный', x: 50, y: 55, employees: 175, area: '7,600 га', manager: 'Морозов М.М.', phone: '+7 (844) 789-01-23' },
  { id: 8, city: 'Казань', region: 'Приволжский', x: 62, y: 35, employees: 220, area: '10,200 га', manager: 'Соколов А.А.', phone: '+7 (843) 890-12-34' },
  { id: 9, city: 'Саратов', region: 'Приволжский', x: 58, y: 50, employees: 160, area: '8,100 га', manager: 'Лебедев Л.Л.', phone: '+7 (845) 901-23-45' },
  { id: 10, city: 'Самара', region: 'Приволжский', x: 65, y: 48, employees: 195, area: '9,300 га', manager: 'Волков В.В.', phone: '+7 (846) 012-34-56' },
  { id: 11, city: 'Воронеж', region: 'Центральный', x: 52, y: 48, employees: 155, area: '7,800 га', manager: 'Зайцев З.З.', phone: '+7 (473) 123-45-67' },
  { id: 12, city: 'Белгород', region: 'Центральный', x: 50, y: 46, employees: 135, area: '6,900 га', manager: 'Орлов О.О.', phone: '+7 (472) 234-56-78' },
  { id: 13, city: 'Липецк', region: 'Центральный', x: 54, y: 47, employees: 110, area: '5,500 га', manager: 'Медведев М.М.', phone: '+7 (474) 345-67-89' },
  { id: 14, city: 'Пенза', region: 'Приволжский', x: 60, y: 45, employees: 125, area: '6,700 га', manager: 'Павлов П.П.', phone: '+7 (841) 456-78-90' },
  { id: 15, city: 'Тамбов', region: 'Центральный', x: 56, y: 46, employees: 105, area: '5,200 га', manager: 'Егоров Е.Е.', phone: '+7 (475) 567-89-01' }
];

const InteractiveMap = () => {
  const [hoveredBranch, setHoveredBranch] = useState<Branch | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const getMarkerSize = (employees: number) => {
    if (employees > 300) return 24;
    if (employees > 200) return 20;
    if (employees > 150) return 16;
    return 14;
  };

  const getRegionColor = (region: string) => {
    switch (region) {
      case 'Центральный': return '#10b981';
      case 'Южный': return '#fbbf24';
      case 'Приволжский': return '#84cc16';
      default: return '#10b981';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-center gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-agro-green" />
          <span className="text-sm text-muted-foreground">Центральный регион</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-agro-yellow" />
          <span className="text-sm text-muted-foreground">Южный регион</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-agro-lime" />
          <span className="text-sm text-muted-foreground">Приволжский регион</span>
        </div>
      </div>

      <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/20">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
        >
          <defs>
            <radialGradient id="mapGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f0fdf4" />
              <stop offset="100%" stopColor="#dcfce7" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <rect width="100" height="100" fill="url(#mapGradient)" opacity="0.3" />

          <path
            d="M 40 35 Q 45 30, 50 32 T 60 35 L 65 40 Q 68 45, 70 50 L 72 60 Q 70 65, 68 68 L 60 70 Q 55 72, 50 70 L 45 68 Q 40 65, 38 60 L 35 50 Q 37 42, 40 35 Z"
            fill="#ffffff"
            opacity="0.6"
            stroke="#10b981"
            strokeWidth="0.3"
          />

          {branches.map((branch) => {
            const size = getMarkerSize(branch.employees);
            const color = getRegionColor(branch.region);
            const isHovered = hoveredBranch?.id === branch.id;
            const isSelected = selectedBranch?.id === branch.id;

            return (
              <g key={branch.id}>
                {(isHovered || isSelected) && (
                  <circle
                    cx={branch.x}
                    cy={branch.y}
                    r={size / 2 + 4}
                    fill={color}
                    opacity="0.2"
                    className="animate-ping"
                  />
                )}
                
                <circle
                  cx={branch.x}
                  cy={branch.y}
                  r={size / 2}
                  fill={color}
                  opacity="0.9"
                  className="cursor-pointer transition-all duration-300 hover:opacity-100"
                  style={{
                    transform: isHovered || isSelected ? 'scale(1.3)' : 'scale(1)',
                    transformOrigin: `${branch.x}px ${branch.y}px`,
                    filter: isHovered || isSelected ? 'url(#glow)' : 'none'
                  }}
                  onMouseEnter={() => setHoveredBranch(branch)}
                  onMouseLeave={() => setHoveredBranch(null)}
                  onClick={() => setSelectedBranch(selectedBranch?.id === branch.id ? null : branch)}
                />
                
                <circle
                  cx={branch.x}
                  cy={branch.y}
                  r={size / 4}
                  fill="white"
                  opacity="0.8"
                />

                {branch.employees > 300 && (
                  <text
                    x={branch.x}
                    y={branch.y - size / 2 - 2}
                    textAnchor="middle"
                    fontSize="3"
                    fill="#1e293b"
                    fontWeight="600"
                    className="pointer-events-none"
                  >
                    {branch.city}
                  </text>
                )}
              </g>
            );
          })}

          {branches.map((branch, idx) => (
            idx < branches.length - 1 && (
              <line
                key={`line-${branch.id}`}
                x1={branch.x}
                y1={branch.y}
                x2={branches[idx + 1].x}
                y2={branches[idx + 1].y}
                stroke="#10b981"
                strokeWidth="0.1"
                opacity="0.15"
                strokeDasharray="0.5,0.5"
              />
            )
          ))}
        </svg>

        {hoveredBranch && (
          <div
            className="absolute bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 pointer-events-none animate-fade-in border border-primary/20"
            style={{
              left: `${hoveredBranch.x}%`,
              top: `${hoveredBranch.y}%`,
              transform: 'translate(-50%, -120%)',
              minWidth: '200px'
            }}
          >
            <div className="font-bold text-lg mb-1">{hoveredBranch.city}</div>
            <div className="text-sm text-muted-foreground mb-2">{hoveredBranch.region} регион</div>
            <div className="flex items-center gap-2 text-sm">
              <Icon name="Users" size={14} className="text-primary" />
              <span>{hoveredBranch.employees} сотрудников</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Icon name="Leaf" size={14} className="text-primary" />
              <span>{hoveredBranch.area}</span>
            </div>
          </div>
        )}
      </div>

      {selectedBranch && (
        <Card className="animate-scale-in shadow-xl border-2 border-primary/30">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-3xl font-bold mb-2">{selectedBranch.city}</h3>
                <Badge 
                  className="text-white"
                  style={{ backgroundColor: getRegionColor(selectedBranch.region) }}
                >
                  {selectedBranch.region} регион
                </Badge>
              </div>
              <button
                onClick={() => setSelectedBranch(null)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Users" size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Сотрудники</div>
                    <div className="font-semibold text-lg">{selectedBranch.employees} человек</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Leaf" size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Площадь посевов</div>
                    <div className="font-semibold text-lg">{selectedBranch.area}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="User" size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Руководитель</div>
                    <div className="font-semibold text-lg">{selectedBranch.manager}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Phone" size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Телефон</div>
                    <div className="font-semibold text-lg">{selectedBranch.phone}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-agro-green/10 to-agro-green/5">
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-agro-green mb-2">15</div>
            <div className="text-muted-foreground">Филиалов по России</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-agro-lime/10 to-agro-lime/5">
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-agro-lime mb-2">3,000+</div>
            <div className="text-muted-foreground">Сотрудников</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-agro-yellow/10 to-agro-yellow/5">
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-agro-yellow mb-2">130,000+</div>
            <div className="text-muted-foreground">Гектаров посевов</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveMap;
